import './index.scss';
import { useState, useEffect } from 'react';
import { Button, Space, message, Col, Row } from 'antd';
import { GET } from 'renderer/api/ipc';
import { algoHl7Config, FTPConfig } from 'renderer/utils/consts';
import yaml from 'js-yaml';
import YamlEditor from '@focus-reactive/react-yaml';
// import FTPOperator from './FTPoperator';

import { getHl7, operateFtp } from '../../../api/algosuite';

const AlgoSuiteTool = () => {
  const [template, setTemplate] = useState(yaml.load(algoHl7Config) as object);
  const [templateError, setTemplateError] = useState(false);

  const [ftpCfg, setFtpCfg] = useState(yaml.load(FTPConfig) as object);
  const [ftpCfgError, setFtpCfgError] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const interaction = (
    cb: any,
    err: boolean,
    msg: string = '请检查yml格式'
  ) => {
    if (!err) {
      cb();
    } else {
      messageApi.open({
        type: 'error',
        content: msg,
      });
    }
  };

  const handleFtp = (type: 'order' | 'observation' | 'together') => {
    interaction(() => {
      operateFtp({ type, template, ftpCfg });
    }, ftpCfgError);
  };

  useEffect(() => {
    const listener = GET('/algo/response', ({ code, message: content }) => {
      if (code === 0) {
        messageApi.open({
          type: 'success',
          content,
        });
      } else {
        messageApi.open({
          type: 'error',
          content,
        });
      }
    });

    return () => {
      listener();
    };
  }, [messageApi]);
  //       {/* <HL7Config className="hl7-config" /> */}
  return (
    <Space className="algo-test-tool">
      {contextHolder}
      <div className="hl7-config">
        <YamlEditor
          text={algoHl7Config}
          onChange={({ json }: any) => {
            setTemplate(json);
            setTemplateError(false);
          }}
          onError={(err: any) => {
            setTemplateError(err);
          }}
        />
      </div>
      <Space className="operate" direction="vertical">
        <Row>
          <Col span={24}>
            <Button
              type="primary"
              style={{ display: 'inline-block', width: '100%' }}
              // shape="circle"
              className="btn"
              // style={{ width: '80px', height: '80px' }}
              onClick={() => {
                interaction(() => {
                  getHl7(template);
                }, templateError);
              }}
            >
              生成HL7
            </Button>
          </Col>
        </Row>

        <Row gutter={[6, 0]}>
          <Col span={12}>
            <Button
              style={{ width: '100%' }}
              onClick={() => handleFtp('order')}
            >
              发送 Order
            </Button>
          </Col>
          <Col span={12}>
            <Button
              style={{ width: '100%' }}
              onClick={() => handleFtp('observation')}
            >
              发送 Observation
            </Button>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Button
              style={{ display: 'inline-block', width: '100%' }}
              onClick={() => handleFtp('together')}
            >
              发送 Order + Observation
            </Button>
          </Col>
        </Row>

        <Row>
          <Col className="ftp-cfg" span={24}>
            <YamlEditor
              onChange={({ json }) => {
                setFtpCfg(json);
                setFtpCfgError(false);
              }}
              text={FTPConfig}
              onError={(error: any) => {
                setFtpCfgError(error);
              }}
            />
          </Col>
        </Row>
      </Space>
    </Space>
  );
};

export default AlgoSuiteTool;
