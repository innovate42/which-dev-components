import { useComponentProps } from "@limio/sdk";

type StaticProps = {
  heading: string,
  headingColor__limio_color: string,
  headingWeight: string,
  subheading: string,
  subheadingColor__limio_color: string,
  subheadingWeight: string,
  componentId: string,
};

const defaultComponentProps: $Shape<StaticProps> = {
  heading: "Lorem ipsum dolor sit ame",
  headingColor__limio_color: "#444444",
  headingWeight: "700",
  subheading:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  subheadingColor__limio_color: "#444444",
  subheadingWeight: "300",
  componentId: "headings-limio",
};

export function useComponentStaticProps(): StaticProps {
  const componentProps = useComponentProps(defaultComponentProps);
}
