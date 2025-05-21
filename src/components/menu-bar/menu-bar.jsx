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

import Icon from '@mui/material/Icon' // Add Material Icons

import IconButton from '@mui/material/IconButton'; // Add IconButton from MaterialUI
import Tooltip from '@mui/material/Tooltip'; // Add Material Tooltip

import HomeIcon from '@mui/icons-material/Home'; // Add Home Icon
import NoteAddIcon from '@mui/icons-material/NoteAdd'; // Add New Note Icon
import SaveIcon from '@mui/icons-material/Save'; // Add Save icon
import FileCopyIcon from '@mui/icons-material/FileCopy'; // Add File Copy Icon
import LeakAddIcon from '@mui/icons-material/LeakAdd'; // Add Leak Add Icon
import PreviewIcon from '@mui/icons-material/Preview'; // Add Preview icon
import SettingsIcon from '@mui/icons-material/Settings'; // Add Settings Icon
import ShareIcon from '@mui/icons-material/Share'; // Add Share Icon
import InfoIcon from '@mui/icons-material/Info'; // Add Info Icon
import ErrorIcon from '@mui/icons-material/Error'; // Add Error icon
import EditIcon from '@mui/icons-material/Edit'; // Add Edit Icon

import { setPlayer } from '../../reducers/mode';
import {
    autoUpdateProject,
    manualUpdateProject,
    requestNewProject,
    remixProject,
    saveProjectAsCopy
} from '../../reducers/project-state';

import {
    openAboutMenu,
    closeAboutMenu,
    openEditMenu,
    openErrorsMenu
} from '../../reducers/menus';
import { setFileHandle } from '../../reducers/tw.js';

import styles from './menu-bar.css';

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
            this.props.onClickNew && this.props.onClickNew(this.props.canSave && this.props.canCreateNew);
        }
    }
    handleClickRemix() {
        this.props.onClickRemix && this.props.onClickRemix();
    }
    handleClickSave() {
        this.props.onClickSave && this.props.onClickSave();
    }
    handleClickSaveAsCopy() {
        this.props.onClickSaveAsCopy && this.props.onClickSaveAsCopy();
    }
    handleClickSeeInside() {
        this.props.onClickSeeInside && this.props.onClickSeeInside();
    }
    handleKeyPress(event) {
        const modifier = (navigator.platform.indexOf('Mac') > -1) ? event.metaKey : event.ctrlKey;
        if (modifier && event.key.toLowerCase() === 's') {
            this.props.handleSaveProject && this.props.handleSaveProject();
            event.preventDefault();
        }
    }
    handleClickSettings() {
        this.props.onClickSettings && this.props.onClickSettings();
    }
    handleClickShare() {
        this.props.onShare && this.props.onShare();
    }

    render() {
        return (
            <Box className={classNames(this.props.className, styles.menuBar)}>
                <div className={styles.mainMenu}>
                    <div className={styles.fileGroup}>
                        {/* Home/Logo Button, only if handler is provided */}
                        {this.props.onClickLogo && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.props.onClickLogo}
                            >
                                {/* SVG icon here */}
                                <Tooltip title="Home">
                                    <IconButton>
                                        <HomeIcon />
                                    </IconButton>
                                </Tooltip>
                            </Button>
                        )}
                        {/* New Project */}
                        {this.props.onClickNew && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.handleClickNew}
                            >
                                {/* SVG icon here */}
                                <Tooltip title="New Project">
                                    <IconButton>
                                        <NoteAddIcon />
                                    </IconButton>
                                </Tooltip>
                            </Button>
                        )}
                        {/* Save */}
                        {this.props.canSave && this.props.onClickSave && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.handleClickSave}
                            >
                                {/* SVG icon here */}
                                <Tooltip title="Save">
                                    <IconButton>
                                        <SaveIcon />
                                    </IconButton>
                                </Tooltip>
                            </Button>
                        )}
                        {/* Save as Copy */}
                        {this.props.canCreateCopy && this.props.onClickSaveAsCopy && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.onClickSaveAsCopy}
                            >
                                {/* SVG icon here */}
                                <Tooltip title="Save as Copy">
                                    <IconButton>
                                        <FileCopyIcon />
                                    </IconButton>
                                </Tooltip>
                            </Button>
                        )}
                        {/* Remix */}
                        {this.props.canRemix && this.props.onClickRemix && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.onClickRemix}
                            >
                                {/* SVG icon here */}
                                <Tooltip title="Remix">
                                    <IconButton>
                                        <LeakAddIcon />
                                    </IconButton>
                                </Tooltip>
                            </Button>
                        )}
                        {/* Edit */}
                        {this.props.enableSeeInside && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.props.onClickSeeInside}
                            >
                                {/* SVG icon here */}
                                <Tooltip title="Edit">
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            </Button>
                        )}
                        {/* Settings */}
                        {this.props.onClickSettings && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.onClickSettings}
                            >
                                {/* SVG icon here */}
                                <Tooltip title="Settings">
                                    <IconButton>
                                        <SettingsIcon />
                                    </IconButton>
                                </Tooltip>
                            </Button>
                        )}
                        {/* Share */}
                        {this.props.onShare && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.onClickShare}
                            >
                                {/* SVG icon here */}
                                <Tooltip title="Share">
                                    <IconButton>
                                        <ShareIcon />
                                    </IconButton>
                                </Tooltip>
                            </Button>
                        )}
                        {/* About */}
                        {this.props.onClickAbout && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.props.onClickAbout}
                            >
                                {/* SVG icon here */}
                                <Tooltip title="About">
                                    <IconButton>
                                        <InfoIcon />
                                    </IconButton>
                                </Tooltip>
                            </Button>
                        )}
                        {/* Error (only when errors exist) */}
                        {this.props.compileErrors && this.props.compileErrors.length > 0 && this.props.onClickErrors && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.props.onClickErrors}
                            >
                                {/* SVG icon here */}
                                <Tooltip title="Error">
                                    <IconButton>
                                        <ErrorIcon />
                                    </IconButton>
                                </Tooltip>
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
