import React from 'react';
import { Table, Space } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import { getDicAll } from '@/axios';
import Export from './export';
import Update from './update';
import View from './view/index';
import './dictionary.less';

export default function Dictionary() {
    const { data: data = { dictionaries: [] } } = useFetch(getDicAll, null); // 查询列表
    const columns = [
        {
            title: '字典名称',
            dataIndex: 'dictionaryName',
            key: 'name',
            width: '25%'
        },
        {
            title: '字典描述',
            dataIndex: 'dictionaryDescribe',
            key: 'dictionaryDescribe',
            width: '30%'
        },
        {
            title: '包含词量',
            dataIndex: 'wordsNum',
            key: 'words',
            width: '100px'
        },
        {
            title: '字典容量',
            dataIndex: 'dictsContent',
            key: 'dicts',
            width: '100px'
        },
        {
            title: '操作',
            width: '100px',
            render: (elem: any, row: any, index: number) => {
                return (
                    <Space size="10">
                        <Update data={row}>
                            <a>更新</a>
                        </Update>
                        {/* <a
                            style={{ color: 'steelblue', margin: '0px', border: '0px' }}
                            onClick={e => {
                                const { dataSource, showDataKey } = this.state;
                                for (let i = 0; i < dataSource.length; i++) {
                                    if ((row.key as string) === (dataSource[i].key as string)) {
                                        this.setState({
                                            showDataKey: i,
                                            selectedRowKeys: []
                                        });
                                        break;
                                    }
                                }
                            }}
                        >
                            查看
                        </a> */}
                        <View data={row}>
                            <a>查看</a>
                        </View>
                        <Export data={row} />
                    </Space>
                );
            }
        }
    ];

    return (
        <div className="dic-page">
            <Table dataSource={data.dictionaries} columns={columns} pagination={{ hideOnSinglePage: true, pageSize: 2 }} />
        </div>
    );
}
