import React from 'react';
import { Upload, Button, Form, Table, Space, Input, message, Modal, Spin } from 'antd';
import { ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import XLSX from 'xlsx';
import Qs from 'qs';
import axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';
import './dictionary.less';
import { ColumnsType } from 'antd/lib/table';

export default function add() {
    return (
        <Form
            name="basic"
            title="新增字典"
            wrapperCol={{ span: 8 }}
            autoComplete="off"
            onFinish={(value: any) => {
                console.log('dictFinish', value);
                const { dictionaryName, dictionaryDescribe } = value;
                const fileByRead = value['inputFile'][0];
                const reader = new FileReader();
                const dictsContent = String((fileByRead.size / 1024).toFixed(2) + ' KB');
                // console.log(dictsContent);
                reader.readAsArrayBuffer(fileByRead.originFileObj); //读取文件的内容
                reader.onload = () => {
                    const { result } = reader;
                    const wb = XLSX.read(result);

                    /* Get first worksheet */
                    const sheetNames = wb.SheetNames[0];
                    const ws = wb.Sheets[sheetNames];
                    const loadData: Array<Array<string>> = XLSX.utils.sheet_to_json(ws, { header: 1 });

                    let wordsNum = 0;
                    const newData = loadData.filter(elem => elem.length !== 0);
                    for (let i = 0; i < newData.length; i++) {
                        wordsNum += loadData[i].length - 1 > 0 ? loadData[i].length - 1 : 0;
                        if (newData[i].length <= 2) newData[i].push('');
                    }
                    newData.splice(0, 1);
                    const data = newData.map((elem: string[], index) => {
                        return {
                            key: String(index),
                            label: elem[0],
                            name: elem[1],
                            abbreviations: Array.from(new Set(elem.slice(2, -1)))
                        };
                    });
                    // console.log(data)
                    const { dataSource: preData } = this.state;
                    const key = String(preData.length);
                    const newUploadData = {
                        key,
                        dictionaryName,
                        dictionaryDescribe,
                        wordsNum,
                        dictsContent,
                        data: [...Array.from(new Set(data))]
                    };

                    // 根据需求对数据进行预处理
                    this.setState({ newUploadData }, message.success('数据校验成功'));
                };
            }}
        >
            <Form.Item label="字典名称" name="dictionaryName" rules={[{ required: true }]} style={{ marginLeft: '2rem' }} wrapperCol={{ span: 20 }}>
                <Input type="text" style={{ width: '25rem', height: '1.6rem' }} />
            </Form.Item>
            <Form.Item
                label="字典描述"
                name="dictionaryDescribe"
                rules={[{ required: true }]}
                style={{ marginLeft: '2rem' }}
                wrapperCol={{ span: 20 }}
            >
                <TextArea autoSize={false} style={{ width: '25rem', height: '6rem', resize: 'none' }} />
            </Form.Item>
            <div style={{ width: '35rem', height: '2rem' }}>
                <Form.Item
                    label="导入文件"
                    valuePropName="fileList"
                    // 如果没有下面这一句会报错
                    getValueFromEvent={(e: any) => {
                        if (Array.isArray(e)) {
                            return e;
                        }
                        return e && e.fileList;
                    }}
                    name="inputFile"
                    rules={[{ required: true }]}
                    style={{ marginLeft: '2rem' }}
                >
                    <Upload
                        showUploadList={false}
                        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        beforeUpload={file => {
                            const isType =
                                file.type === 'application/vnd.ms-excel' ||
                                file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                            isType ? message.success('上传成功!') : message.error('上传文件只支持xls,xlsx类型');
                            return isType;
                        }}
                    >
                        <Button icon={<UploadOutlined />} style={{ zIndex: '999' }}>
                            点击上传文件
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ position: 'relative', top: '-55px', left: '65px' }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            文件校验
                        </Button>
                        <Button
                            type="primary"
                            htmlType="button"
                            onClick={() => {
                                const { dataSource: preData, newUploadData } = this.state;
                                Object.keys(newUploadData as Record<string, any>).length === 0
                                    ? message.warn('上传失败,文件未校验或未上传')
                                    : axios({
                                          timeout: 20000,
                                          method: 'post',
                                          headers: {
                                              'Content-Type': 'application/x-www-form-urlencoded'
                                          },
                                          url: 'http://101.35.15.228:8080/mongo/dictionaries/upload',
                                          data: Qs.stringify(newUploadData)
                                      })
                                          .then(res => {
                                              console.log(res);
                                              console.log('newUploadData', newUploadData);
                                              this.setState(
                                                  { dataSource: [newUploadData, ...preData], newUploadData: {} },
                                                  message.success('字典新增成功')
                                              );
                                          })
                                          .catch(error => {
                                              console.log(error);
                                              message.error('请检查服务器是否开启');
                                          });
                            }}
                        >
                            新增字典
                        </Button>
                    </Space>
                </Form.Item>
            </div>
        </Form>
    );
}
