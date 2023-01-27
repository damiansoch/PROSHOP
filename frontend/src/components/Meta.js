import { Helmet } from 'react-helmet';

const Meta = ({ title }) => {
  return (
    <Helmet>
      <meta charSet='utf-8' />
      <title>Welcome to ProShop | {title}</title>
      <meta name='description' content='We sell the best products for cheap' />
      <meta name='keywords' content='electronics, cheap electronic' />
    </Helmet>
  );
};

export default Meta;
