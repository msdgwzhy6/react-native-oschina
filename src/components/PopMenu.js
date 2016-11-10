import React, {
    Component,
    PropTypes,
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Animated,
    Modal,
} from './Libraries';

export default class PopMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: null,
        };
        this.callback = null;
        window.popMenu = this;
    }

    show(menu, callback) {
        this.setState({ menu });
        this.callback = callback;
    }

    hide() {
        this.setState({ menu: null });
    }

    onPressSpace() {
        this.hide();
    }

    onPressMenu(menuObj) {
        menuObj.onPress && menuObj.onPress();
        this.callback && this.callback(menuObj);
        this.hide();
        return false;
    }

    render() {
        if (!this.state.menu)
            return null;
        return (
            <Modal
                animationType="fade"
                transparent={true}
                onRequestClose={this.hide.bind(this)}>
                <TouchableOpacity
                    style={styles.container}
                    onPress={this.onPressSpace.bind(this)}>
                    {this.renderMenu()}
                </TouchableOpacity>
            </Modal>
        );
    }

    renderMenu() {
        return this.state.menu.children.map((m, i) => {
            let styleArr = [styles.btn];
            if (this.state.menu.selectedId == m.id)
                styleArr.push(styles.btnSelected);
            return (
                <TouchableOpacity
                    key={i}
                    style={styleArr}
                    onPress={this.onPressMenu.bind(this, m)}>
                    <Text style={window.theme.textWhite}>{m.name}</Text>
                </TouchableOpacity>
            );
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    btn: {
        backgroundColor: window.theme.primaryColor,
        width: window.width * 0.7,
        padding: 10,
        marginBottom: StyleSheet.hairlineWidth,
    },
    btnSelected: {
    	backgroundColor: window.theme.embellishmentColor,
    },
});
