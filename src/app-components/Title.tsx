interface TitleProps {
  Title: string;
}

function Title({ Title }: TitleProps) {
  return <h1>{Title}</h1>;
}

export default Title;
