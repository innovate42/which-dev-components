import { useComponentProps } from "@limio/sdk";

type StaticProps = {
  bgColor__limio_color: String,
  downArrowImg: String,
  headline: String,
  subline: String,
  faqItems: Array<{
    question: String,
    answer__limio_richtext: String,
  }>,
  componentId: String,
  showButtonBackgroundColor: boolean,
  btnBgColor__limio_color: String,
  btnBorderColor__limio_color: String,
};

const defaultComponentProps: $Shape<StaticProps> = {
  bgColor__limio_color: "#fff",
  downArrowImg: "https://image.flaticon.com/icons/svg/118/118738.svg",
  headline: "Do you have questions?",
  subline: "Here are some answers.",
  faqItems: [
    {
      question: "Can I contact Customer Services?",
      answer__limio_richtext:
        "<script>alert('Hello World')</script>Go to our help centre",
    },
    {
      question: "Another Random question?",
      answer__limio_richtext: "Some Random answer with <b>Bold</b>!",
    },
  ],
  componentId: "faq-banner-limio",
  showButtonBackgroundColor: true,
  btnBgColor__limio_color: "#efd5c4",
  tnBorderColor__limio_color: "#F47C24",
};

export function useComponentStaticProps(): StaticProps {
  const componentProps = useComponentProps(defaultComponentProps);
}
