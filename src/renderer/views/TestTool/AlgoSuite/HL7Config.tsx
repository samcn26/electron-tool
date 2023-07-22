import { FunctionComponent } from 'react';

interface HL7ConfigProps {
  className?: string;
  [key: string]: any;
}

const HL7Config: FunctionComponent<HL7ConfigProps> = ({ className }) => {
  return <div className={className}>HL7config</div>;
};

HL7Config.defaultProps = {
  className: 'hl7-config',
};
export default HL7Config;
