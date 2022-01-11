import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Modal, Form, notification, Alert } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import Upload from '@/components/common/e-upload';

import { uploadTemplate, getProcess } from '@/axios';
import { guid } from '@/utils/tools';
import { Props } from './interface';

import './index.less';

const { Item } = Form;

const taskId = guid();

const ModalSendMsg = (props: Props) => {
    const [form] = Form.useForm();
    const timer = useRef(null) as any;
    const [processId, setProcessId] = useState(null);
    const [btnDisabled, setBtnDisabled] = useState(false);

    // 有关业务场景
    const { dispatch: disPatchUploadTpl } = useFetch(uploadTemplate, null, false);

    // 弹框关闭的回调
    const close = () => {
        form.resetFields();
        props.onCancel && props.onCancel();
    };

    const openNotificationWithIcon = (url: string) => {
        notification['error']({
            message: '通知',
            duration: null,
            description: (
                <p>
                    错误文件:{' '}
                    <a href={url} rel="noopener noreferrer" target="_blank">
                        下载
                    </a>
                </p>
            )
        });
    };

    // 提交
    const onFinish = (values: any) => {
        if (btnDisabled) return;
        values.fileUrl = values.file && values.file.url;
        delete values.file;

        disPatchUploadTpl({ ...values, taskId }).then((res: any) => {
            // 查询进度
            setProcessId(res);
        });
    };

    const clearTimer = () => {
        close(); // 关闭弹窗
        clearInterval(timer.current);
        timer.current = null;
    };

    const queryTask = useCallback(() => {
        // 1、查询进度
        getProcess(processId)
            .then((res: any) => {
                if (res.status == 1) {
                    clearTimer();
                }
            })
            .catch(res => {
                res.data && res.data.nosUrl && openNotificationWithIcon(res.data.nosUrl);
                clearTimer();
            });
    }, [clearTimer, processId]);

    useEffect(() => {
        if (processId && !timer.current) {
            // 查询进度
            setBtnDisabled(true); // 禁止定义确定按钮
            timer.current = setInterval(() => {
                console.log('定时查询开启，后端要提供接口');
                queryTask();
            }, 5000);
        }
    }, [queryTask, processId, timer]);

    return (
        <>
            <Modal
                className="u-modal-template"
                visible
                width={700}
                title="上传模板"
                onOk={form.submit}
                okButtonProps={{ disabled: btnDisabled }}
                okText="确定"
                onCancel={close}
            >
                {processId && <Alert showIcon type="info" message="正在处理，请稍后..." style={{ textAlign: 'center' }} />}
                <Form form={form} onFinish={onFinish}>
                    <Item name="file" rules={[{ required: true, message: '请上传文件' }]} valuePropName="fileList">
                        <Upload dragger maxCount={1} validFileType={['xlsx']} extra="仅支持xlsx格式" />
                    </Item>
                </Form>
            </Modal>
        </>
    );
};

export default React.memo(ModalSendMsg);
