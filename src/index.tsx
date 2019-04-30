import styled from "styled-components";
import { FunctionComponent } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import React from "react";
import { isMobileBrowser } from "./utils";

function isSSR() {
  return typeof window === "undefined";
}

const StaggerContainer = styled.div`
  position: relative;
`;

export interface StaggerProps {
  /**
   * A unique id for each stagger element
   */
  staggerId?: string;
}

const counter = (() => {
  let id = 0;
  return () => "_" + ++id;
})();

const ShouldStaggerContext = React.createContext(true);

export class Stagger extends React.Component<
  StaggerProps,
  { _staggerId: string }
> {
  constructor(props: StaggerProps) {
    super(props);
    this.state = {
      _staggerId: counter()
    };
  }

  render(): JSX.Element {
    const { staggerId, children, ...rest } = this.props;

    return (
      <ShouldStaggerContext.Consumer>
        {shouldStagger =>
          shouldStagger ? (
            <Flipped
              {...rest}
              stagger="default"
              flipId={staggerId || this.state._staggerId}
            >
              <StaggerContainer>{children}</StaggerContainer>
            </Flipped>
          ) : (
            <div {...rest}>{children}</div>
          )
        }
      </ShouldStaggerContext.Consumer>
    );
  }
}

export const StaggerAnimationContainer: FunctionComponent<{
  visible: boolean;
}> = ({ children, ...rest }) => (
  <ShouldStaggerContext.Consumer>
    {shouldStagger => {
      const Container = styled.div<{ visible: boolean }>`
        ${props =>
          props.visible
            ? `
                ${StaggerContainer} {
                  opacity: 1;
                  transform: translateY(0);
                }
            `
            : `
                ${StaggerContainer} {
                  opacity: 0;
                  transform: translateY(15px);
                }
            `}
      `;

      return shouldStagger ? (
        <Container {...rest}>{children}</Container>
      ) : (
        <div {...rest}>{children}</div>
      );
    }}
  </ShouldStaggerContext.Consumer>
);

export class StaggerWrapper extends React.Component<
  {
    shouldStagger?: boolean;
    staggerOnMobile?: boolean;
    auto?: boolean;
  },
  { isVisible: boolean }
> {
  // Apparently I can't use function components for
  // compatibility reasons. WHY?

  constructor(props: any) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  componentDidMount(): void {
    this.setState({ isVisible: true });
  }

  render(): JSX.Element {
    const { children, shouldStagger, staggerOnMobile, auto, ...rest } = this.props;

    let staggerChildren = children;
    if (auto) {
      staggerChildren = React.Children.map(children, (child, i) => <Stagger staggerId={i + '--'}>{ child }</Stagger>);
    }

    const { isVisible } = this.state;
    return (
      <ShouldStaggerContext.Provider
        value={
          typeof shouldStagger === "undefined"
            ? !isSSR() && (staggerOnMobile ? true : !isMobileBrowser())
            : shouldStagger
        }
      >
        <Flipper
          {...rest}
          flipKey={isVisible}
          staggerConfig={{ default: { speed: 0.2 } }}
        >
          <StaggerAnimationContainer visible={isVisible}>
            {staggerChildren}
          </StaggerAnimationContainer>
        </Flipper>
      </ShouldStaggerContext.Provider>
    );
  }
}
