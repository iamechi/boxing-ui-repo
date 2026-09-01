interface TitleProps {
  Title: string;
}

function Title({ Title }: TitleProps) {
  return <h1 id="homeTitle">{Title}</h1>;
}

export default Title;
