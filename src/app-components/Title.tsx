interface TitleProps {
  Title: string;
}

/*A simple component for the title screen*/
function Title({ Title }: TitleProps) {
  return <h1 id="homeTitle">{Title}</h1>;
}

export default Title;
