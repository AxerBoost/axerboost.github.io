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

// Material UI Icons
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SaveIcon from '@mui/icons-material/Save';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import InfoIcon from '@mui/icons-material/Info';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import Tooltip from '@mui/material/Tooltip';

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
                        <Tooltip title="Home">
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.props.onClickLogo}
                            >
                                <HomeIcon />
                            </Button>
                        </Tooltip>
                        {/* New Project */}
                        <Tooltip title="New Project">
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.handleClickNew}
                            >
                                <AddBoxIcon />
                            </Button>
                        </Tooltip>
                        {/* Save */}
                        {this.props.canSave && (
                            <Tooltip title="Save">
                                <Button
                                    className={classNames(styles.menuBarButton)}
                                    onClick={this.handleClickSave}
                                >
                                    <SaveIcon />
                                </Button>
                            </Tooltip>
                        )}
                        {/* Save as Copy */}
                        {this.props.canCreateCopy && (
                            <Tooltip title="Save as Copy">
                                <Button
                                    className={classNames(styles.menuBarButton)}
                                    onClick={this.handleClickSaveAsCopy}
                                >
                                    <FileCopyIcon />
                                </Button>
                            </Tooltip>
                        )}
                        {/* Remix */}
                        {this.props.canRemix && (
                            <Tooltip title="Remix">
                                <Button
                                    className={classNames(styles.menuBarButton)}
                                    onClick={this.handleClickRemix}
                                >
                                    <RefreshIcon />
                                </Button>
                            </Tooltip>
                        )}
                        {/* Edit */}
                        <Tooltip title="Edit">
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.props.onClickEdit}
                            >
                                <EditIcon />
                            </Button>
                        </Tooltip>
                        {/* Settings */}
                        <Tooltip title="Settings">
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.handleClickSettings}
                            >
                                <SettingsIcon />
                            </Button>
                        </Tooltip>
                        {/* Share */}
                        <Tooltip title="Share">
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.handleClickShare}
                            >
                                <ShareIcon />
                            </Button>
                        </Tooltip>
                        {/* About */}
                        <Tooltip title="About">
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.props.onClickAbout}
                            >
                                <InfoIcon />
                            </Button>
                        </Tooltip>
                        {/* Error (only when errors exist) */}
                        {this.props.compileErrors && this.props.compileErrors.length > 0 && (
                            <Tooltip title="Errors">
                                <Button
                                    className={classNames(styles.menuBarButton)}
                                    onClick={this.props.onClickErrors}
                                >
                                    <ErrorOutlineIcon />
                                </Button>
                            </Tooltip>
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
        // open your settings modal here
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
