import { Col, Row } from 'antd';
import { FormikProps } from 'formik';
import * as React from 'react';

import {
    FormInput,
    FormSubmit,
    FromBody,
    verticalLayout,
    verticalLayoutNoLabel
} from '@/components';
import { text } from '@/i18n';
import { Topic, Word } from '@/restful';

export type WordFormOwnProps = FormikProps<Word>;

export function WordForm(props: WordFormOwnProps) {
    const {
        values,
        handleChange,
        handleBlur
    } = props;

    return (
        <FromBody formProps={props}>
            <div style={{ display: 'flex' }}>
                <Row style={{ flexGrow: 1, marginRight: 8 }} gutter={15}>
                    <Col md={12} xl={6} span={24}>
                        <FormInput
                            name={nameof<Word>(o => o.source)}
                            value={values.source}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label={text('Text')}
                            placeholder={text('Input text')}
                        />
                    </Col>
                    <Col md={12} xl={6} span={24}>
                        <FormInput
                            name={nameof<Word>(o => o.translation)}
                            value={values.translation}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label={text('Translation')}
                            placeholder={text('Input translation')}
                        />
                    </Col>
                    <Col md={24} xl={12} span={24}>
                        <FormInput
                            name={nameof<Word>(o => o.examples)}
                            value={values.examples}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label={text('Example')}
                            placeholder={text('Write a example')}
                        />
                    </Col>
                </Row>
            </div>
            <FormSubmit
                formProps={props}
                type="ghost"
            >
                {text('Add to topic')}
            </FormSubmit>
        </FromBody>
    );
}