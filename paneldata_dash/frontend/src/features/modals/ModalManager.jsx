import React from 'react';
import { connect } from 'react-redux';
import PromptModal from './PromptModal';
import InfoModal from './InfoModal'

const modalLookup = {
  PromptModal,
  InfoModal
};

const mapState = state => ({
  currentModal: state.modals
});

const ModalManager = ({ currentModal }) => {
  let renderedModal;

  console.log('current modal', currentModal)
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderedModal = (
      <ModalComponent {...modalProps} />
    );
  }
  return <span>{renderedModal}</span>;
};

export default connect(mapState)(ModalManager);
