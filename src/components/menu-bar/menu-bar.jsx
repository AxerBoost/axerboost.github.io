import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import TWSaveStatus from './tw-save-status.jsx';

import { setPlayer } from '../../reducers/mode';
import {
    autoUpdateProject,
    getIsUpdating,
    getIsShowingProject,
    manualUpdateProject,
    requestNewProject,
    remixProject,
    saveProjectAsCopy
} from '../../reducers/project-state';

import {
    openAboutMenu,
    closeAboutMenu,
    aboutMenuOpen,
    openFileMenu,
    closeFileMenu,
    fileMenuOpen,
    openEditMenu,
    closeEditMenu,
    editMenuOpen,
    openErrorsMenu,
    closeErrorsMenu,
    errorsMenuOpen
} from '../../reducers/menus';
import { setFileHandle } from '../../reducers/tw.js';

import collectMetadata from '../../lib/collect-metadata';

import styles from './menu-bar.css';
import scratchLogo from './scratch-logo.svg';

// REMOVED: import Tooltip from '@mui/material/Tooltip';

class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleClickSeeInside',
            'handleClickNew',
            'handleClickRemix',
            'handleClickSave',
            'handleClickSaveAsCopy',
            'handleKeyPress',
            'handleClickSettings',
            'handleClickShare'
        ]);
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }
    handleClickNew() {
        const readyToReplaceProject = this.props.confirmReadyToReplaceProject
            ? this.props.confirmReadyToReplaceProject('Replace project?')
            : true;
        if (readyToReplaceProject) {
            this.props.onClickNew(this.props.canSave && this.props.canCreateNew);
        }
    }
    handleClickRemix() {
        this.props.onClickRemix();
    }
    handleClickSave() {
        this.props.onClickSave();
    }
    handleClickSaveAsCopy() {
        this.props.onClickSaveAsCopy();
    }
    handleClickSeeInside() {
        this.props.onClickSeeInside();
    }
    handleKeyPress(event) {
        const modifier = (navigator.platform.indexOf('Mac') > -1) ? event.metaKey : event.ctrlKey;
        if (modifier && event.key.toLowerCase() === 's') {
            this.props.handleSaveProject();
            event.preventDefault();
        }
    }
    handleClickSettings() {
        this.props.onClickSettings();
    }
    handleClickShare() {
        this.props.onShare();
    }

    render() {
        return (
            <Box className={classNames(this.props.className, styles.menuBar)}>
                <div className={styles.mainMenu}>
                    <div className={styles.fileGroup}>
                        {/* Home/Logo Button */}
                        <Button
                            className={classNames(styles.menuBarButton)}
                            onClick={this.props.onClickLogo}
                        >
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
</svg>
                        </Button>
                        {/* New Project */}
                        <Button
                            className={classNames(styles.menuBarButton)}
                            onClick={this.handleClickNew}
                        >
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h4M9 3v4a1 1 0 0 1-1 1H4m11 6v4m-2-2h4m3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"/>
</svg>
                        </Button>
                        {/* Save */}
                        {this.props.canSave && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.handleClickSave}
                            >
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 0 1 1-1h11.586a1 1 0 0 1 .707.293l2.414 2.414a1 1 0 0 1 .293.707V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z"/>
  <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M8 4h8v4H8V4Zm7 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>
                            </Button>
                        )}
                        {/* Save as Copy */}
                        {this.props.canCreateCopy && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.handleClickSaveAsCopy}
                            >
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M14 4v3a1 1 0 0 1-1 1h-3m4 10v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2m11-3v10a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7.87a1 1 0 0 1 .24-.65l2.46-2.87a1 1 0 0 1 .76-.35H18a1 1 0 0 1 1 1Z"/>
</svg>
                            </Button>
                        )}
                        {/* Remix */}
                        {this.props.canRemix && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.handleClickRemix}
                            >
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16h13M4 16l4-4m-4 4 4 4M20 8H7m13 0-4 4m4-4-4-4"/>
</svg>
                            </Button>
                        )}
                        {/* Edit */}
                        <Button
                            className={classNames(styles.menuBarButton)}
                            onClick={this.props.onClickEdit}
                        >
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
</svg>
                        </Button>
                        {/* Settings */}
                        <Button
                            className={classNames(styles.menuBarButton)}
                            onClick={this.handleClickSettings}
                        >
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"/>
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
</svg>
                        </Button>
                        {/* Share */}
                        <Button
                            className={classNames(styles.menuBarButton)}
                            onClick={this.handleClickShare}
                        >
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.926 10.898 15 7.727m-7.074 5.39L15 16.29M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
</svg>
                        </Button>
                        {/* About */}
                        <Button
                            className={classNames(styles.menuBarButton)}
                            onClick={this.props.onClickAbout}
                        >
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>
                        </Button>
                        {/* Error (only when errors exist) */}
                        {this.props.compileErrors && this.props.compileErrors.length > 0 && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.props.onClickErrors}
                            >
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>
                            </Button>
                        )}
                    </div>
                </div>
                <div className={styles.accountInfoGroup}>
                    <div className={styles.menuBarItem}>
                        <TWSaveStatus />
                    </div>
                </div>
            </Box>
        );
    }
}

MenuBar.propTypes = {
    canCreateCopy: PropTypes.bool,
    canCreateNew: PropTypes.bool,
    canRemix: PropTypes.bool,
    canSave: PropTypes.bool,
    className: PropTypes.string,
    compileErrors: PropTypes.array,
    confirmReadyToReplaceProject: PropTypes.func,
    handleSaveProject: PropTypes.func,
    onClickAbout: PropTypes.func,
    onClickEdit: PropTypes.func,
    onClickErrors: PropTypes.func,
    onClickLogo: PropTypes.func,
    onClickNew: PropTypes.func,
    onClickRemix: PropTypes.func,
    onClickSave: PropTypes.func,
    onClickSaveAsCopy: PropTypes.func,
    onClickSettings: PropTypes.func,
    onShare: PropTypes.func,
};

MenuBar.defaultProps = {
    compileErrors: []
};

const mapStateToProps = (state, ownProps) => {
    return {
        compileErrors: state.scratchGui.tw.compileErrors,
        canSave: state.scratchGui.projectState.canSave,
        canCreateCopy: state.scratchGui.projectState.canCreateCopy,
        canCreateNew: state.scratchGui.projectState.canCreateNew,
        canRemix: state.scratchGui.projectState.canRemix
    };
};

const mapDispatchToProps = dispatch => ({
    onClickSeeInside: () => dispatch(setPlayer(false)),
    autoUpdateProject: () => dispatch(autoUpdateProject()),
    onClickNew: needSave => {
        dispatch(requestNewProject(needSave));
        dispatch(setFileHandle(null));
    },
    onClickRemix: () => dispatch(remixProject()),
    onClickSave: () => dispatch(manualUpdateProject()),
    onClickSaveAsCopy: () => dispatch(saveProjectAsCopy()),
    onClickSettings: () => {
        // wip
    },
    onShare: () => { /* Share logic */ },
    onClickLogo: () => { window.location.href = '/'; },
    onClickAbout: () => { /* About logic */ },
    onClickEdit: () => dispatch(openEditMenu()),
    onClickErrors: () => dispatch(openErrorsMenu())
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(MenuBar);
