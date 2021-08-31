import React from 'react'
import {Prompt} from 'react-router-dom'
import PromptModal from '../../../features/modals/PromptModal'
import DialogContentText from "@material-ui/core/DialogContentText";

export class RouteLeavingGuard extends React.Component {
    // move modal visible to reducer.
    state = {
        modalVisible: false,
        lastLocation: null,
        confirmedNavigation: false,
    }
    showModal = (location) => this.setState({
        modalVisible: true,
        lastLocation: location,
    })
    closeModal = (callback) => {
        console.log(callback)
        this.setState({
            modalVisible: false
        }, callback)
    }
    handleBlockedNavigation = (nextLocation) => {
        const {confirmedNavigation} = this.state
        const {shouldBlockNavigation} = this.props
        if (!confirmedNavigation && shouldBlockNavigation(nextLocation)){
            this.showModal(nextLocation)
            return false
        }

        return true
    }
    handleConfirmNavigationClick = () => this.closeModal(() => {
        const {navigate} = this.props
        const {lastLocation} = this.state
        if (lastLocation) {
            this.setState({
                confirmedNavigation: true
            }, () => {
                // Navigate to the previous blocked location with your navigate function
                navigate(lastLocation.pathname)
            })
        }
    })
    handleCancelNavigationClick = () => this.closeModal(() =>{

    });
    render() {
        const {when} = this.props
        const {modalVisible} = this.state
        return (
            <>
                <Prompt
                    when={when}
                    message={this.handleBlockedNavigation}/>
                <PromptModal
                    message="You have pending changes. Are you sure you want to leave the page ?"
                    visible={modalVisible}
                    onCancel={this.handleCancelNavigationClick}
                    onConfirm={this.handleConfirmNavigationClick}/>
            </>
        )
    }
}
export default RouteLeavingGuard
