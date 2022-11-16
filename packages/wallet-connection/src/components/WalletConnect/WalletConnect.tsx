import { useContext } from 'react';
import ConnectWalletButton from '../ConnectWalletButton/ConnectWalletButton';
import { ModalContext } from '../../providers/ModalProvider';
import Modal from "../Modal/Modal";

const WalletConnect = () => {
    const {isModalOpen, toggleModal} = useContext(ModalContext);

    return (
        <>
            <ConnectWalletButton
                onClick={toggleModal}
                label='Connect wallet'
            />
            {isModalOpen && <Modal screen='Connect' open={isModalOpen} onClose={toggleModal} />}
        </>
    )
};

export default WalletConnect;
