import { BubbleBlock, Gray } from "./atoms"

export const ASectionWithTitle = ({
  title,
  count,
  children,
}: {
  title: string
  count?: number
  children: React.ReactNode
}) => (
  <>
    <h4>
      {title}
      {count && <Gray>&middot; {count}</Gray>}
    </h4>
    <BubbleBlock>{children}</BubbleBlock>
  </>
)
