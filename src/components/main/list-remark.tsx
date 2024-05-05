import { useStoreBackups, useStoreGames } from '@/store';
import { Button, Input } from '@nextui-org/react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function ListRemark({ oldName }: { oldName: string }) {
    const [state, setState] = useState(false);
    const [remark, setRemark] = useState<string>('');
    const mainName = useStoreGames(store => store.mainName);
    const { renameBackup } = useStoreBackups(store => store);
    const click = () => {
        window.ipcRenderer
            .invoke('backup-remark', {
                name: mainName,
                zipName: oldName,
                remark: remark,
            })
            .then(newName => {
                renameBackup(oldName, newName);
            });
    };
    return (
        <>
            <Button isIconOnly size="sm" title="修改备注" onPress={() => setState(true)}>
                <TextSvg />
            </Button>
            <Modal isOpen={state} backdrop="blur" onClose={() => setState(false)}>
                <ModalContent>
                    {close => (
                        <>
                            <ModalHeader>请输入新备注</ModalHeader>
                            <ModalBody>
                                <Input value={remark} onChange={e => setRemark(e.target.value)} />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    variant="faded"
                                    onPress={() => {
                                        close();
                                        click();
                                    }}
                                >
                                    确定
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

const TextSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M5.616 19h12.769q.269 0 .442-.173t.173-.442V9.614L14.387 5H5.616q-.27 0-.443.173T5 5.616v12.769q0 .269.173.442t.443.173m0 1q-.672 0-1.144-.472T4 18.385V5.615q0-.67.472-1.143Q4.944 4 5.616 4h9.173L20 9.211v9.173q0 .672-.472 1.144T18.385 20zM7.5 16h9v-1h-9zm0-3.5h9v-1h-9zm0-3.5h5.73V8H7.5zM5 19V5z"
        ></path>
    </svg>
);
