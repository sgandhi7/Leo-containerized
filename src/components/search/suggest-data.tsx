export default function Contact() {
  const emailAddress = 'datasets@horizon-hunt.com';

  return (
    <div className="display-flex justify-content-center flex-direction-column align-items-center">
      <h2 className="margin-bottom-1">
        Have another Dataset you'd like to see?
      </h2>
      <span className="margin-1">
        Contact us: <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
      </span>
    </div>
  );
}
