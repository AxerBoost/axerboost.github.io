import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

import { DynamicIcon } from 'lucide-react/dynamic';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import TWSaveStatus from './tw-save-status.jsx';

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
                                <DynamicIcon name="house" />
                            </Button>
                        )}
                        {/* New Project */}
                        {this.props.onClickNew && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.handleClickNew}
                            >
                                {/* SVG icon here */}
                                <DynamicIcon name="file-plus" />
                            </Button>
                        )}
                        {/* Save */}
                        {this.props.canSave && this.props.onClickSave && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.handleClickSave}
                            >
                                {/* SVG icon here */}
                                <DynamicIcon name="save" />
                            </Button>
                        )}
                        {/* Save as Copy */}
                        {this.props.canCreateCopy && this.props.onClickSaveAsCopy && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.onClickSaveAsCopy}
                            >
                                {/* SVG icon here */}
                                <DynamicIcon name="clipboard-copy" />
                            </Button>
                        )}
                        {/* Remix */}
                        {this.props.canRemix && this.props.onClickRemix && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.onClickRemix}
                            >
                                {/* SVG icon here */}
                                <DynamicIcon name="target" />
                            </Button>
                        )}
                        {/* Edit */}
                        {this.props.enableSeeInside && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.props.onClickSeeInside}
                            >
                                {/* SVG icon here */}
                                <DynamicIcon name="eye" />
                            </Button>
                        )}
                        {/* Settings */}
                        {this.props.onClickSettings && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.onClickSettings}
                            >
                                {/* SVG icon here */}
                                <DynamicIcon name="settings" />
                            </Button>
                        )}
                        {/* Share */}
                        {this.props.onShare && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.onClickShare}
                            >
                                {/* SVG icon here */}
                                <DynamicIcon name="share-2" />
                            </Button>
                        )}
                        {/* About */}
                        {this.props.onClickAbout && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.props.onClickAbout}
                            >
                                {/* SVG icon here */}
                                <DynamicIcon name="info" />
                            </Button>
                        )}
                        {/* Error (only when errors exist) */}
                        {this.props.compileErrors && this.props.compileErrors.length > 0 && this.props.onClickErrors && (
                            <Button
                                className={classNames(styles.menuBarButton)}
                                onClick={this.props.onClickErrors}
                            >
                                {/* SVG icon here */}
                                <DynamicIcon name="triangle-alert" />
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
