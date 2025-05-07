import { Helmet } from "react-helmet";

export default function CustomHelmet(props: { title: string }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{props.title}</title>
      <link rel="canonical" href="https://dswar.ceetool.com/admin" />
    </Helmet>
  );
}
