import { Modal } from 'antd';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { DomainContext, WithGlobalModal } from './base';

const GlobalModal = (props: WithContextProps<WithGlobalModal>) => {
    const { globalModal, setContext } = props;

    if (!globalModal) {
        return null;
    }

    return (
        <Modal
            {...globalModal}
            destroyOnClose={true}
            visible={globalModal.visible === undefined ? true : globalModal.visible}
            onCancel={async (e) => {
                if (globalModal.onCancel) {
                    await globalModal.onCancel(e);
                }
                setContext({
                    globalModal: {
                        ...globalModal,
                        visible: false
                    }
                });
            }}
            onOk={async (e) => {
                if (globalModal.onOk) {
                    await globalModal.onOk(e);
                }
                setContext({
                    globalModal: {
                        ...globalModal,
                        visible: false
                    }
                });
            }}
        />
    );
};

export default withContext<DomainContext>('globalModal')(GlobalModal);