import { message } from 'antd';
import { Formik, FormikBag } from 'formik';
import * as React from 'react';

import { text } from '@/i18n';
import { getErrorMessage, request, Word, wordResources } from '@/restful';

import { WordForm, WordFormOwnProps } from './topic-form-control';

interface NewWordFormControlProps {
    readonly initialValues: Partial<Word>;
}

export class NewWordFormControl extends React.PureComponent<NewWordFormControlProps> {
    public render() {
        const { initialValues } = this.props;
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={this.onSubmit}
            >
                {WordForm}
            </Formik>
        );
    }

    readonly onSubmit = async (
        values: Word,
        formiKBag: FormikBag<WordFormOwnProps, Word>
    ) => {
        try {
            await request(wordResources.create, {
                type: 'body',
                value: values
            });

            const textMessage = text('Success');
            message.success(textMessage);
        } catch (error) {
            formiKBag.setStatus({
                error: await getErrorMessage(error)
            });
        } finally {
            formiKBag.setSubmitting(false);
        }
    }
}