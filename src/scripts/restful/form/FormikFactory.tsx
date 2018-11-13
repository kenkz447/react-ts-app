import { Formik, FormikBag, FormikProps } from 'formik';
import * as React from 'react';
import { Fetcher, RequestParams, Resource } from 'react-restful';

import { getErrorMessage } from '../utils';

export interface FormFieldSchema<P = {}> {
    readonly name?: string;
    readonly component: React.ComponentType<P>;
    readonly props: P;
}

export interface FormFactoryProps {
    readonly request: Fetcher['fetchResource'];
}

export interface FormCreateOptions<FormValues = {}, OwnProps = {}, RecordType = {}> {
    readonly resource: Resource<RecordType>;
    readonly onSusscess: (responseData: {}, ownProps: OwnProps) => void;
    readonly onFailed?: (error: Response) => void;
    readonly initialValues?: FormValues;
    readonly component: React.ComponentType<FormikProps<FormValues>>;
    // tslint:disable-next-line:no-any
    readonly wrapper?: (FromComponent: React.ComponentType<any>) => React.ComponentType<any>;
    readonly getRequestParams?: (formValues: FormValues, fromProps: OwnProps) => RequestParams;
    readonly getRequestMeta?: (formValues: FormValues, fromProps: OwnProps) => {};
}

export interface FormProps<FormValues = {}> {
    readonly initialValues?: Partial<FormValues>;
}

export class FormikFactory {
    readonly props: FormFactoryProps;
    constructor(props: FormFactoryProps) {
        this.props = props;
    }

    readonly createSubmission = <V, P>(options: FormCreateOptions, formProps: P) => {
        const { request } = this.props;
        const {
            resource,
            onSusscess,
            onFailed,
            getRequestParams,
            getRequestMeta
        } = options;

        return async (values: V, formiKBag: FormikBag<P, V>) => {
            try {
                const requestParams = getRequestParams && getRequestParams(values, formProps);
                const rquestMeta = getRequestMeta && getRequestMeta(values, formProps);

                const responseData = await request(
                    resource,
                    requestParams || { type: 'body', value: values },
                    rquestMeta
                );

                onSusscess(responseData, formProps);
            } catch (error) {
                if (onFailed) {
                    onFailed(error);
                }

                formiKBag.setStatus({
                    error: await getErrorMessage(error)
                });
            } finally {
                formiKBag.setSubmitting(false);
            }
        };
    }

    readonly create = function <
        P extends FormProps<V> = FormProps<V>,
        V = {}
        >(options: FormCreateOptions): React.ComponentType<P> {
        const { component, wrapper } = options;

        const Form = (props: FormProps) => {
            const { initialValues } = props;

            return (
                <Formik
                    onSubmit={this.createSubmission(options, props)}
                    initialValues={initialValues}
                >
                    {component}
                </Formik>
            );
        };

        if (!wrapper) {
            return Form;
        }

        return wrapper(Form);
    };
}