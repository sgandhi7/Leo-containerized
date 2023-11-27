export default function Contact() {
  const emailAddress = 'datasets@horizon-hunt.com';

  return (
    <div className="display-flex justify-content-center flex-direction-column align-items-center">
      <hr className="hr-suggest" />
      <h2 className="margin-bottom-2">
        Have another Dataset you'd like to see?
      </h2>
      <p className="margin-1">Contact us:</p>
      <p className="margin-0">
        <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
      </p>
    </div>
  );
}
