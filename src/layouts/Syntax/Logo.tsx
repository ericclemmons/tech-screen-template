export function Logomark(props) {
  return (
    <div {...props}>
      <img
        src={`https://github.com/${import.meta.env.PUBLIC_GITHUB_USER}.png`}
      />
    </div>
  );
}

export function Logo(props) {
  return <h1 {...props}>Tech Screen</h1>;
}
