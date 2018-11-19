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
import { Topic } from '@/restful';

export type TopicFormOwnProps = FormikProps<Topic>;

export function TopicForm(props: TopicFormOwnProps) {
    const {
        values,
        handleChange,
        handleBlur
    } = props;

    return (
        <FromBody formProps={props}>
            <FormInput
                name={nameof<Topic>(o => o.name)}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                label={text('Name')}
                placeholder={text('Input topic name')}
                {...verticalLayout}
            />
            <FormInput
                name={nameof<Topic>(o => o.sourceLang)}
                value={values.sourceLang}
                onChange={handleChange}
                onBlur={handleBlur}
                label={text('Source language')}
                placeholder={text('Select source language')}
                {...verticalLayout}
            />
            <FormInput
                name={nameof<Topic>(o => o.targetLang)}
                value={values.targetLang}
                onChange={handleChange}
                onBlur={handleBlur}
                label={text('Target language')}
                placeholder={text('Select target language')}
                {...verticalLayout}
            />
            <FormInput
                name={nameof<Topic>(o => o.description)}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                label={text('Description')}
                placeholder={text('Typing some words about this topic...')}
                {...verticalLayout}
            />
            <FormSubmit
                formProps={props}
                formItemProps={verticalLayoutNoLabel}
            >
                {text('Create')}
            </FormSubmit>
        </FromBody>
    );
}