import { Formik, FormikBag } from 'formik';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { TOPICS_DETAIL_PATH } from '@/configs';
import { WithHistory } from '@/domain';
import { getErrorMessage, request, Topic, topicResources } from '@/restful';
import { replaceRoutePath } from '@/utilities';

import { TopicForm, TopicFormOwnProps } from './topic-form-control';

type TopicFormControlProps = WithContextProps<WithHistory>;

class TopicFormControl extends React.PureComponent<TopicFormControlProps> {
    public render() {
        return (
            <Formik
                initialValues={{}}
                onSubmit={this.onSubmit}
            >
                {TopicForm}
            </Formik>
        );
    }

    readonly onSubmit = async (
        values: Topic,
        formiKBag: FormikBag<TopicFormOwnProps, Topic>
    ) => {
        const { history } = this.props;

        try {
            const createdTopic = await request(topicResources.create, {
                type: 'body',
                value: values
            });

            const topicDetailUrl = replaceRoutePath(TOPICS_DETAIL_PATH, createdTopic);
            history.push(topicDetailUrl);

        } catch (error) {
            formiKBag.setStatus({
                error: await getErrorMessage(error)
            });
        } finally {
            formiKBag.setSubmitting(false);
        }
    }
}

export default withContext<WithHistory>('history')(TopicFormControl);