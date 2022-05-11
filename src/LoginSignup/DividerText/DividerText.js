import './DividerText.css'
function DividerText( {text} ) {
    return (
    <div
     className="divider d-flex align-items-center my-4">
      <p 
        className="text-center fw-bold mx-3 mb-0">
      </p>
        <h1>
          {text}&nbsp;&nbsp;&nbsp;
        </h1>
      <p/>
    </div>
    );
}
export default DividerText;