/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback } from 'react';
import { Form } from 'informed';
import MarkdownField from './InformedMarkdown';

const TestForm = () => {
  const [values, setValues] = useState({ values: { md: '' } });
  const onSubmit = useCallback(v => {
    setValues({ values: v });
  }, [setValues]);
  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          md: '# This is the initial value',
        }}
      >
        <label>
          Text:
          <MarkdownField field="md" />
        </label>
        <button type="submit">Submit</button>
      </Form>
      <div>
        Submitted values
        <pre>
          {JSON.stringify(values.values, null, 2)}
        </pre>
      </div>
    </>
  );
};

export default TestForm;
