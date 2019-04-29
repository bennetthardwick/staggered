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
  staggerId: string;
}

const ShouldStaggerContext = React.createContext(true);

export const Stagger: FunctionComponent<StaggerProps> = ({
  children,
  staggerId,
  ...rest
}) => (
  <ShouldStaggerContext.Consumer>
    {shouldStagger => {
      console.log("should", shouldStagger);

      return shouldStagger ? (
        <Flipped {...rest} stagger="default" flipId={staggerId}>
          <StaggerContainer>{children}</StaggerContainer>
        </Flipped>
      ) : (
        <div {...rest}>{children}</div>
      );
    }}
  </ShouldStaggerContext.Consumer>
);

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
    const { children, shouldStagger, staggerOnMobile, ...rest } = this.props;
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
            {children}
          </StaggerAnimationContainer>
        </Flipper>
      </ShouldStaggerContext.Provider>
    );
  }
}
