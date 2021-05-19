import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export const NotAdmin = () => {
  const bull = <span className="bullet">•</span>;

  return (
    <Card className="no-admin" variant="outlined">
      <CardContent>
        <h2 className="no-admin__title">
          Sorry!
        </h2>
        <p className="no-admin__syllabes">
          re{bull}strict{bull}ed
        </p>
        <p className="no-admin__dictionary">
          adjective
        </p>
        <p className="no-admin__text">
          You need to be an Admin to manage users accesses.
        </p>
      </CardContent>
    </Card>
  );
}
