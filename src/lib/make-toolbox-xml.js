import LazyScratchBlocks from './tw-lazy-scratch-blocks';

const categorySeparator = '<sep gap="36"/>';
const blockSeparator = '<sep gap="36"/>'; // At default scale, about 28px

const translate = (id, english) => {
    if (LazyScratchBlocks.isLoaded()) {
        const ScratchBlocks = LazyScratchBlocks.get();
        return ScratchBlocks.ScratchMsgs.translate(id, english);
    }
    return english;
};

const motion = function (isInitialSetup, isStage, targetId) {
    const stageSelected = translate(
        'MOTION_STAGE_SELECTED',
        'Motion blocks are not available when the stage is selected.'
    );
    return `
    <category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF" secondaryColour="#3373CC">
        ${isStage ? `
        <label text="${stageSelected}"></label>
        ` : `
        <label text="Movement"></label>
        <block type="motion_movesteps">
            <value name="STEPS">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_moveupdownsteps">
            <value name="STEPS">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_turnright">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        <block type="motion_turnleft">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <label text="Positioning"></label>
        <block type="motion_goto">
            <value name="TO">
                <shadow type="motion_goto_menu">
                </shadow>
            </value>
        </block>
        <block type="motion_gotoxy">
            <value name="X">
                <shadow id="movex" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow id="movey" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_changebyxy">
            <value name="DX">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
            <value name="DY">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_glideto" id="motion_glideto">
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="motion_glideto_menu">
                </shadow>
            </value>
        </block>
        <block type="motion_glidesecstoxy">
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="X">
                <shadow id="glidex" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow id="glidey" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <label text="Direction"></label>
        <block type="motion_pointindirection">
            <value name="DIRECTION">
                <shadow type="math_angle">
                    <field name="NUM">90</field>
                </shadow>
            </value>
        </block>
        <block type="motion_pointtowards">
            <value name="TOWARDS">
                <shadow type="motion_pointtowards_menu">
                </shadow>
            </value>
        </block>
        <block type="motion_pointtowardsxy">
            <value name="X">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_turnaround"/>
        ${blockSeparator}
        <label text="Manipulation"></label>
        <block type="motion_changexby">
            <value name="DX">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_setx">
            <value name="X">
                <shadow id="setx" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_changeyby">
            <value name="DY">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_sety">
            <value name="Y">
                <shadow id="sety" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <label text="Edge Detection"></label>
        <block type="motion_ifonedgebounce"/>
        <block type="motion_ifonspritebounce">
            <value name="SPRITE">
                <shadow type="motion_pointtowards_menu"></shadow>
            </value>
        </block>
        ${blockSeparator}
        <label text="Rotation Style"></label>
        <block type="motion_setrotationstyle"/>
        <block type="motion_move_sprite_to_scene_side"/>
        ${blockSeparator}
        <label text="Variables"></label>
        <block id="${targetId}_xposition" type="motion_xposition"/>
        <block id="${targetId}_yposition" type="motion_yposition"/>
        <block id="${targetId}_direction" type="motion_direction"/>
        ${blockSeparator}
        <label text="Tweening"></label>
        <block type="jeremygamerTweening_tweenValue">
            <value name="MODE">
                <shadow type="text">
                    <field name="TEXT">linear</field>
                </shadow>
            </value>
            <value name="DIRECTION">
                <shadow type="text">
                    <field name="TEXT">in</field>
                </shadow>
            </value>
            <value name="START">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="END">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
            <value name="AMOUNT">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        <block type="jeremygamerTweening_tweenVariable">
            <value name="VAR">
                <shadow type="text">
                    <field name="TEXT">my variable</field>
                </shadow>
            </value>
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
            <value name="SEC">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="MODE">
                <shadow type="text">
                    <field name="TEXT">linear</field>
                </shadow>
            </value>
            <value name="DIRECTION">
                <shadow type="text">
                    <field name="TEXT">in</field>
                </shadow>
            </value>
        </block>
        <block type="jeremygamerTweening_tweenXY">
            <value name="PROPERTY">
                <shadow type="text">
                    <field name="TEXT">x position</field>
                </shadow>
            </value>
            <value name="X">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
            <value name="SEC">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="MODE">
                <shadow type="text">
                    <field name="TEXT">linear</field>
                </shadow>
            </value>
            <value name="DIRECTION">
                <shadow type="text">
                    <field name="TEXT">in</field>
                </shadow>
            </value>
        </block>
        <block type="jeremygamerTweening_tweenProperty">
            <value name="PROPERTY">
                <shadow type="text">
                    <field name="TEXT">x position</field>
                </shadow>
            </value>
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
            <value name="SEC">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="MODE">
                <shadow type="text">
                    <field name="TEXT">linear</field>
                </shadow>
            </value>
            <value name="DIRECTION">
                <shadow type="text">
                    <field name="TEXT">in</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        `}
        ${categorySeparator}
    </category>
    `;
};

const xmlEscape = function (unsafe) {
    return unsafe.replace(/[<>&'"]/g, c => {
        switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        }
    });
};

const looks = function (isInitialSetup, isStage, targetId, costumeName, backdropName) {
    const hello = translate('LOOKS_HELLO', 'Hello!');
    const hmm = translate('LOOKS_HMM', 'Hmm...');
    return `
    <category name="%{BKY_CATEGORY_LOOKS}" id="looks" colour="#9966FF" secondaryColour="#774DCB">
        ${isStage ? '' : `
        <block type="looks_sayforsecs">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">${hello}</field>
                </shadow>
            </value>
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">2</field>
                </shadow>
            </value>
        </block>
        <block type="looks_say">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">${hello}</field>
                </shadow>
            </value>
        </block>
        <block type="looks_thinkforsecs">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">${hmm}</field>
                </shadow>
            </value>
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">2</field>
                </shadow>
            </value>
        </block>
        <block type="looks_think">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">${hmm}</field>
                </shadow>
            </value>
        </block>
        <block type="looks_stoptalking"/>
        ${blockSeparator}
        <block type="looks_setFont">
            <value name="font">
                <shadow type="text">
                    <field name="TEXT">Helvetica</field>
                </shadow>
            </value>
            <value name="size">
                <shadow type="math_number">
                    <field name="NUM">14</field>
                </shadow>
            </value>
        </block>
        <block type="looks_setColor">
            <field name="prop">BUBBLE_STROKE</field>
            <value name="color">
                <shadow type="colour_picker"></shadow>
            </value>
        </block>
        <block type="looks_setShape">
            <field name="prop">STROKE_WIDTH</field>
            <value name="color">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block id="${targetId}_sayWidth" type="looks_sayWidth"></block>
        <block id="${targetId}_sayHeight" type="looks_sayHeight"></block>
        ${blockSeparator}
        `}
        ${isStage ? `
            <block type="looks_switchbackdropto">
                <value name="BACKDROP">
                    <shadow type="looks_backdrops">
                        <field name="BACKDROP">${backdropName}</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_switchbackdroptoandwait">
                <value name="BACKDROP">
                    <shadow type="looks_backdrops">
                        <field name="BACKDROP">${backdropName}</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_nextbackdrop"/>
            <block type="looks_getinputofcostume">
                <value name="INPUT">
                    <shadow type="looks_getinput_menu"/>
                </value>
                <value name="COSTUME">
                    <shadow type="looks_backdrops">
                        <field name="BACKDROP">${backdropName}</field>
                    </shadow>
                </value>
            </block>
        ` : `
            <block id="${targetId}_switchcostumeto" type="looks_switchcostumeto">
                <value name="COSTUME">
                    <shadow type="looks_costume">
                        <field name="COSTUME">${costumeName}</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_nextcostume"/>
            <block type="looks_getinputofcostume">
                <value name="INPUT">
                    <shadow type="looks_getinput_menu"/>
                </value>
                <value name="COSTUME">
                    <shadow type="looks_costume">
                        <field name="COSTUME">${costumeName}</field>
                    </shadow>
                </value>
            </block>
            ${blockSeparator}
            <block type="looks_switchbackdropto">
                <value name="BACKDROP">
                    <shadow type="looks_backdrops">
                        <field name="BACKDROP">${backdropName}</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_nextbackdrop"/>
            ${blockSeparator}
            <block type="looks_changesizeby">
                <value name="CHANGE">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_setsizeto">
                <value name="SIZE">
                    <shadow type="math_number">
                        <field name="NUM">100</field>
                    </shadow>
                </value>
            </block>
            ${blockSeparator}
            <block type="looks_setStretch">
                <value name="X">
                    <shadow type="math_number">
                        <field name="NUM">100</field>
                    </shadow>
                </value>
                <value name="Y">
                    <shadow type="math_number">
                        <field name="NUM">100</field>
                    </shadow>
                </value>
            </block>
            <block id="${targetId}_stretchGetX" type="looks_stretchGetX"></block>
            <block id="${targetId}_stretchGetY" type="looks_stretchGetY"></block>
        `}
        ${blockSeparator}
        <block type="looks_changeeffectby">
            <value name="CHANGE">
                <shadow type="math_number">
                    <field name="NUM">25</field>
                </shadow>
            </value>
        </block>
        <block type="looks_seteffectto">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_setTintColor">
            <value name="color">
                <shadow type="colour_picker"></shadow>
            </value>
        </block>
        <block type="looks_cleargraphiceffects"/>
        <block id="${targetId}_getEffectValue" type="looks_getEffectValue"/>
        <block id="${targetId}_tintColor" type="looks_tintColor"/>
        ${blockSeparator}
        ${isStage ? '' : `
            <block type="looks_show"/>
            <block type="looks_hide"/>
            <block id="${targetId}_getSpriteVisible" type="looks_getSpriteVisible"/>
            ${blockSeparator}
            <block type="looks_changeVisibilityOfSpriteShow">
                <value name="VISIBLE_OPTION">
                    <shadow type="looks_changeVisibilityOfSprite_menu"/>
                </value>
            </block>
            <block type="looks_changeVisibilityOfSpriteHide">
                <value name="VISIBLE_OPTION">
                    <shadow type="looks_changeVisibilityOfSprite_menu"/>
                </value>
            </block>
            <block type="looks_getOtherSpriteVisible">
                <value name="VISIBLE_OPTION">
                    <shadow type="looks_getOtherSpriteVisible_menu"/>
                </value>
            </block>
            ${blockSeparator}
            <block type="looks_gotofrontback"/>
            <block type="looks_goforwardbackwardlayers">
                <value name="NUM">
                    <shadow type="math_integer">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_layersSetLayer">
                <value name="NUM">
                    <shadow type="math_integer">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_goTargetLayer">
                <value name="VISIBLE_OPTION">
                    <shadow type="looks_getOtherSpriteVisible_menu"/>
                </value>
            </block>
            <block id="${targetId}_layersGetLayer" type="looks_layersGetLayer"></block>
            ${blockSeparator}
        `}
        ${isStage ? `
            <block id="backdropnumbername" type="looks_backdropnumbername"/>
        ` : `
            <block id="${targetId}_costumenumbername" type="looks_costumenumbername"/>
            <block id="backdropnumbername" type="looks_backdropnumbername"/>
            <block id="${targetId}_size" type="looks_size"/>
        `}
        ${categorySeparator}
    </category>
    `;
};

// ... the rest of the file remains unchanged from your original

// [sound], [events], [control], [sensing], [operators], [variables], [lists], [myBlocks], [liveTests], xmlOpen, xmlClose etc remain as in your original

const makeToolboxXML = function (isInitialSetup, isStage = true, targetId, categoriesXML = [],
    costumeName = '', backdropName = '', soundName = '', isLiveTest = false) {
    isStage = isInitialSetup || isStage;
    const gap = [categorySeparator];

    costumeName = xmlEscape(costumeName);
    backdropName = xmlEscape(backdropName);
    soundName = xmlEscape(soundName);

    categoriesXML = categoriesXML.slice();
    const moveCategory = categoryId => {
        const index = categoriesXML.findIndex(categoryInfo => categoryInfo.id === categoryId);
        if (index >= 0) {
            // remove the category from categoriesXML and return its XML
            const [categoryInfo] = categoriesXML.splice(index, 1);
            return categoryInfo.xml;
        }
        // return `undefined`
    };
    const motionXML = moveCategory('motion') || motion(isInitialSetup, isStage, targetId);
    const looksXML = moveCategory('looks') || looks(isInitialSetup, isStage, targetId, costumeName, backdropName);
    const soundXML = moveCategory('sound') || sound(isInitialSetup, isStage, targetId, soundName);
    const eventsXML = moveCategory('event') || events(isInitialSetup, isStage, targetId);
    const controlXML = moveCategory('control') || control(isInitialSetup, isStage, targetId);
    const sensingXML = moveCategory('sensing') || sensing(isInitialSetup, isStage, targetId);
    const operatorsXML = moveCategory('operators') || operators(isInitialSetup, isStage, targetId);
    const variablesXML = moveCategory('variables') || variables(isInitialSetup, isStage, targetId);
    const listsXML = moveCategory('lists') || lists(isInitialSetup, isStage, targetId);
    const myBlocksXML = moveCategory('procedures') || myBlocks(isInitialSetup, isStage, targetId);
    const liveTestsXML = moveCategory('liveTests') || liveTests(isLiveTest);

    const everything = [
        xmlOpen,
        motionXML,
        looksXML,
        soundXML,
        eventsXML,
        controlXML,
        sensingXML,
        operatorsXML,
        variablesXML,
        listsXML,
        myBlocksXML
    ];
    if (isLiveTest) everything.push(liveTestsXML);

    for (const extensionCategory of categoriesXML) {
        everything.push(extensionCategory.xml);
    }

    everything.push(xmlClose);
    return everything.join(`\n${gap}\n`);
};

export default makeToolboxXML;
