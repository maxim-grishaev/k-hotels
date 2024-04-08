import styled from "styled-components"

/*
This Button isn/t really used anywhara and is kept meinly for the illustration purposes.
It doent't fit the design of the app.
But I kept it here to show how styled-components can be used instead of plain CSS.
*/

export const ButtonArounder = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) => {
  return (
    <TheButton data-testid="button" onClick={onClick}>
      {children}
    </TheButton>
  )
}

const TheButton = styled.button`
  font-family: system-ui, sans-serif;
  cursor: pointer;
  padding: 0.1em 0.6em;
  font-weight: bold;
  border: none;
  border-radius: 50px;

  --c: #229091; /* the color*/
  --_p: 0%;
  --_g: linear-gradient(var(--c) 0 0) no-repeat;

  box-shadow: 0 0 0 0.1em inset var(--c);
  background: var(--_g) calc(var(--_p, 0%) - 100%) 0%,
    var(--_g) calc(200% - var(--_p, 0%)) 0%,
    var(--_g) calc(var(--_p, 0%) - 100%) 100%,
    var(--_g) calc(200% - var(--_p, 0%)) 100%;
  background-size: 50.5% calc(var(--_p, 0%) / 2 + 0.5%);
  outline-offset: 0.1em;
  transition: background-size 0.4s, background-position 0s 0.4s;

  &:hover {
    --_p: 100%;
    transition: background-position 0.4s, background-size 0s;
  }

  &:active {
    box-shadow: 0 0 9e9Q inset #0009;
    background-color: var(--c);
    color: #fff;
  }
`
