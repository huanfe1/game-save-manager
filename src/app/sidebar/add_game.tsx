import { Button, Input } from '@nextui-org/react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { useStoreGames } from '@/lib/store';
import { AddSvg } from '@/lib/svg';

export default function AddGame() {
    const [state, setState] = useState(false);
    const [name, setName] = useState('');
    const [path, setPath] = useState('');
    const select = () => {
        window.ipcRenderer.invoke('chooseFolder').then(res => setPath(res));
    };
    const close = () => {
        setName('');
        setPath('');
        setState(false);
    };
    const { refresh } = useStoreGames(store => store);
    const click = () => {
        if (!name || !path) {
            toast.error(`未填写游戏名称或路径`);
            return;
        }
        window.ipcRenderer.invoke('addGame', { name, path }).then(res => {
            refresh();
            toast.dismiss();
            close();
        });
    };
    return (
        <>
            <div
                className="mx-3 flex cursor-pointer items-center justify-center space-x-2 rounded border-2 border-dotted border-default-300 py-2"
                onClick={() => setState(true)}
            >
                <AddSvg width="18px" height="18px" />
                <span>添加游戏</span>
            </div>
            <Modal isOpen={state} backdrop="blur" onClose={close}>
                <ModalContent>
                    <ModalHeader>添加游戏</ModalHeader>
                    <ModalBody>
                        <Input label="游戏名称" value={name} onValueChange={setName} />
                        <Input label="存档路径" disabled value={path} />
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={select}>路径选择</Button>
                        <Button color="primary" onPress={click}>
                            确定
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
