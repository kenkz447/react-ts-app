import './EditableInput.scss';

import { Icon, Input, message } from 'antd';
import * as React from 'react';

import { text } from '@/i18n';

export interface EditableInputProps{
    readonly property: string;
    readonly defaultValue: string;
    // tslint:disable-next-line:no-any
    readonly onChange?: (value: string) => Promise<any>;
    readonly onEditDone?: (data: {}) => void; 
    readonly placeholder?: string;
    readonly allowEmpty?: boolean;
}

interface EditableInputState {
    readonly focused: boolean;
    readonly currentInputValue: string;
    readonly loading: boolean;
}

export class EditableInput extends React.PureComponent<EditableInputProps, EditableInputState> {
    readonly ref = React.createRef<Input>();

    readonly state: EditableInputState = {
        focused: false,
        currentInputValue: this.props.defaultValue,
        loading: false
    };

    readonly onInputValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            currentInputValue: e.target.value
        });
    }

    public render() {
        const { onChange, defaultValue, placeholder, allowEmpty, onEditDone } = this.props;
        const { currentInputValue, loading } = this.state;

        return (
            <Input
                ref={this.ref}
                suffix={loading && <Icon type="loading" spin={true} />}
                value={currentInputValue}
                className="editable-input"
                placeholder={placeholder}
                onKeyPress={(e) => {
                    if (e.key !== 'Enter') {
                        return;
                    }
                    this.ref.current!.blur();
                }}
                onChange={this.onInputValueChanged}
                onBlur={async (e) => {
                    if (allowEmpty === false && !currentInputValue) {
                        const warnText = text('Empty value not allowed!');
                        void message.warning(warnText);
                        this.setState({
                            currentInputValue: defaultValue
                        });

                        return;
                    }

                    if (!onChange || currentInputValue === defaultValue) {
                        return;
                    }

                    this.setState({
                        loading: true
                    });

                    const onChangeResult = await onChange(currentInputValue);

                    const successText = text('Success');
                    message.success(successText);

                    this.setState({
                        loading: false
                    });

                    if (onEditDone) {
                        onEditDone(onChangeResult);
                    }
                }}
            />
        );
    }
}