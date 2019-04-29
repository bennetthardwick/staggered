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

export const Stagger: FunctionComponent<StaggerProps> = !(
  isSSR() || isMobileBrowser()
)
  ? ({ children, staggerId, ...rest }) => (
      <Flipped {...rest} stagger="default" flipId={staggerId}>
        <StaggerContainer>{children}</StaggerContainer>
      </Flipped>
    )
  : ({ children, staggerId, ...rest }) => <div {...rest}>{children}</div>;

export const StaggerAnimationContainer: FunctionComponent<{
  visible: boolean;
}> = !(isSSR() || isMobileBrowser())
  ? styled.div<{ visible: boolean }>`
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
    `
  : ({ children, visible, ...rest }) => <div {...rest}>{children}</div>;

export class StaggerWrapper extends React.Component<{}, { isVisible: boolean }> {
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
    const { children, ...rest } = this.props;
    const { isVisible } = this.state;
    return (
      <Flipper
        {...rest}
        flipKey={isVisible}
        staggerConfig={{ default: { speed: 0.2 } }}
      >
        <StaggerAnimationContainer visible={isVisible}>
          {children}
        </StaggerAnimationContainer>
      </Flipper>
    );
  }
}
