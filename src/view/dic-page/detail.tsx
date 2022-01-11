import React from 'react';

export default function detail() {
    return (
        <div>
            <span className="spanCss">查看详情</span>
            {/* 右侧页面 */}

            <Space style={{ position: 'relative', top: '-10px', float: 'right', marginRight: '10px' }}>
                <Button
                    type="primary"
                    size="middle"
                    icon={<IconSet className="m-icon" type="icon-xiangyou" />}
                    onClick={() => {
                        const { data } = this.state.dataSource[this.state.showDataKey];
                        var filename = 'dict.xls';
                        const newData: Array<Array<string>> = data.map((value: { name: string; label: string; abbreviations?: any }) => [
                            value['label'],
                            value['name'],
                            ...value['abbreviations']
                        ]);
                        newData.unshift(['标签', '全称', '别名']);
                        var sheetName = 'Sheet1';
                        var wb = XLSX.utils.book_new(),
                            ws = XLSX.utils.aoa_to_sheet(newData);
                        // console.log(ws);
                        XLSX.utils.book_append_sheet(wb, ws, sheetName);
                        XLSX.writeFile(wb, filename);
                        message.success('文件导出成功!', 1);
                    }}
                >
                    导出
                </Button>
                <Button
                    size="middle"
                    type="primary"
                    icon="+"
                    onClick={() => {
                        Modal.confirm({
                            title: '增加字典',
                            icon: <ExclamationCircleOutlined />,
                            content: (
                                <>
                                    <div style={{ marginBottom: '5px' }}>
                                        <label>全称:</label>&nbsp;
                                        <Input
                                            ref={a => (this.addDictName = a as Input)}
                                            style={{ width: '315px', zIndex: '9999' }}
                                            placeholder="请输新增字典全称"
                                        />
                                    </div>
                                    <div style={{ marginBottom: '5px' }}>
                                        <label>别名:</label>&nbsp;
                                        <Input
                                            ref={a => (this.addAbbreviations = a as Input)}
                                            placeholder="不同别名间请以'|'分割"
                                            style={{ width: '315px', zIndex: '9999' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '5px' }}>
                                        <label>标签:</label>&nbsp;
                                        <Input
                                            ref={a => (this.addLable = a as Input)}
                                            style={{ width: '315px', zIndex: '9999' }}
                                            placeholder="请输新增字典标签"
                                        />
                                    </div>
                                </>
                            ),
                            okText: '确定',
                            cancelText: '取消',
                            onOk: () => {
                                // 实现字典数据的增加
                                const { value: addDictName } = this.addDictName.state;
                                const { value: addAbbreviations } = this.addAbbreviations.state;
                                const { value: addLable } = this.addLable.state;
                                if (addDictName === '' || addAbbreviations === '' || addLable === '') {
                                    message.warn('数据输入不完整');
                                    return;
                                }
                                const newAbbreviations = addAbbreviations.split('|');
                                console.log(addDictName, newAbbreviations, addLable);
                                let { dataSource: newData, showDataKey } = this.state;
                                const addData = {
                                    key: String(data.length),
                                    label: addLable,
                                    name: addDictName,
                                    abbreviations: newAbbreviations
                                };
                                data.unshift(addData);
                                const insertData = { key: newData[showDataKey].key, data: addData };

                                axios({
                                    timeout: 20000,
                                    method: 'post',
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                    url: 'http://101.35.15.228:8080/mongo/dictionaries/insert',
                                    data: Qs.stringify(insertData)
                                })
                                    .then(res => {
                                        console.log(res);
                                        newData[showDataKey]['data'] = data;
                                        this.setState({ newData }, message.success('成功添加'));
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        message.error('添加失败');
                                    });
                            },
                            onCancel() {
                                message.success('取消添加');
                            }
                        });
                    }}
                >
                    增加字典
                </Button>
                <Button
                    size="middle"
                    type="primary"
                    onClick={() => {
                        const { selectedRowKeys, showDataKey } = this.state;
                        const selectedRowKeysLen = selectedRowKeys.length;
                        if (selectedRowKeysLen === 0) {
                            message.warn('未选中数据');
                            return;
                        } else {
                            Modal.confirm({
                                title: '警告',
                                icon: <ExclamationCircleOutlined />,
                                content: '请确认是否要删除',
                                okText: '确认',
                                cancelText: '取消',
                                onOk: () => {
                                    const findIndex = (newData: any, nowKey: string | number) => {
                                        for (let k = 0; k < newData.length; k++) {
                                            if (newData[k].key === nowKey) return k;
                                        }
                                    };
                                    const { dataSource } = this.state;
                                    for (let j = 0; j < selectedRowKeysLen; j++) {
                                        const deleteData = { dictKey: dataSource[showDataKey].key, dataKey: selectedRowKeys[j] };
                                        // 删除数据
                                        axios({
                                            timeout: 20000,
                                            method: 'delete',
                                            headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded'
                                            },
                                            url: 'http://101.35.15.228:8080/mongo/dictionaries/delete',
                                            data: Qs.stringify(deleteData)
                                        })
                                            .then(res => {
                                                const Sp = findIndex(dataSource[showDataKey].data, deleteData.dataKey);
                                                data.splice(Sp as number, 1);
                                                dataSource[this.state.showDataKey].data = data;
                                                this.setState({ dataSource }, message.success('删除成功'));
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                message.error('删除失败');
                                            });
                                    }
                                },
                                onCancel() {
                                    message.success('取消删除');
                                }
                            });
                        }
                    }}
                >
                    删除
                </Button>
                <Button
                    size="middle"
                    type="primary"
                    onClick={() => {
                        const { selectedRowKeys } = this.state;
                        if (selectedRowKeys.length === 0) message.warning('未选中数据');
                        else if (selectedRowKeys.length > 1) message.warning('一次只能编辑一条数据');
                        else {
                            Modal.confirm({
                                title: '警告',
                                icon: <ExclamationCircleOutlined />,
                                content: (
                                    <>
                                        <div style={{ marginBottom: '5px' }}>
                                            <label>全称:</label>&nbsp;
                                            <Input
                                                ref={a => (this.changeName = a as Input)}
                                                style={{ width: '100px', zIndex: '9999' }}
                                                defaultValue={editName}
                                                placeholder="输入修改全称"
                                            />
                                        </div>
                                        <div style={{ marginBottom: '5px' }}>
                                            <label>别名:</label>&nbsp;
                                            <Input
                                                ref={a => (this.changeAttribute = a as Input)}
                                                style={{ width: '250px', zIndex: '9999', marginRight: '5px' }}
                                                defaultValue={editAbbreviations.join('、')}
                                                placeholder="输入添加别名"
                                            />
                                        </div>
                                        <p>Tips:&nbsp; 别名间用"、"分割</p>
                                    </>
                                ),
                                okText: '确认',
                                cancelText: '取消',
                                onOk: () => {
                                    const { dataSource } = this.state;
                                    const { value: changeName } = this.changeName.state;
                                    const { value: changeAttribute } = this.changeAttribute.state;
                                    if (changeName) {
                                        let now_index = 0;
                                        for (let j = 0; j < dataSource[showDataKey]['data'].length; j++) {
                                            if (dataSource[showDataKey]['data'][j].key === editKey) {
                                                now_index = j;
                                                break;
                                            }
                                        }
                                        data[now_index]['name'] = changeName;
                                        const newAttribute = changeAttribute.split('、');
                                        if (!newAttribute[newAttribute.length - 1]) newAttribute.splice(newAttribute.length - 1, 1);
                                        // const Attribute = newAttribute[newAttribute.length -1 ] ? newAttribute : newAttribute.splice(newAttribute.length -1,1)
                                        data[now_index]['abbreviations'] = newAttribute;
                                        dataSource[showDataKey].data = [...data];
                                        const deleteTag = {
                                            dictKey: dataSource[showDataKey].key,
                                            dataKey: editKey,
                                            data: data[now_index]
                                        };
                                        //实现删除标签后字典的更新
                                        axios({
                                            timeout: 10000,
                                            method: 'post',
                                            headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded'
                                            },
                                            url: 'http://101.35.15.228:8080/mongo/dictionaries/update',
                                            data: Qs.stringify(deleteTag)
                                        })
                                            .then(res => {
                                                this.setState({ dataSource, selectedRowKeys: [] }, message.success('编辑成功'));
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                message.error('编辑成功失败');
                                            });
                                    } else {
                                        message.warn('未输入内容');
                                    }
                                },
                                onCancel() {
                                    message.success('取消编辑');
                                }
                            });
                        }
                    }}
                >
                    编辑
                </Button>
            </Space>
            <Table
                className="dictRight"
                dataSource={[...data]}
                size="small"
                pagination={{
                    pageSize: 8,
                    hideOnSinglePage: true,
                    position: ['bottomRight'],
                    showSizeChanger: true
                }}
                rowSelection={{
                    selectedRowKeys: this.state.selectedRowKeys,
                    onChange: (selectedRowKeys, selectedRows) => {
                        const selectedLen = selectedRows.length;
                        const selectedRowData = selectedLen === 0 ? {} : selectedRows[selectedLen - 1];
                        this.setState({ selectedRowKeys, selectedRowData });
                    }
                }}
            >
                <Column title="名称" dataIndex="name" key="name" width="15%" fixed="left" />
                <Column width="75%" title="别名" dataIndex="abbreviations" key="abbreviations" />
            </Table>
        </div>
    );
}
