import './Title.css'

export default function Titulo({title, subtitle}) {
  return (
    <div className="title-wrapper">
      <h1 className="title">{title}</h1>
      <h2 className="subtitle">{subtitle}</h2>
    </div>
  );
}

 
