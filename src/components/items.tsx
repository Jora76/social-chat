import styled from "styled-components";
import { borderColor, colorData } from "./colorData";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

// =========================================== Props ===========================================

interface ContainerProps {
    width: string;
    height: string;
    borderRight?: string;
    borderLeft?: string;
    borderTop?: string;
    borderBottom?: string;
    backgroundColor?: string;
    children?: React.ReactNode;
}

// =========================================== Styled Components ===========================================

/**
 * Panel component
 * 
 * Un composant de panneau centré en column.
 * 
 * @param {string} width - La largeur du panneau.
 * @param {string} height - La hauteur du panneau.
 * @param {string} borderRight - La bordure droite du panneau.
 * @param {string} borderLeft - La bordure gauche du panneau.
 * @param {string} borderTop - La bordure supérieure du panneau.
 * @param {string} borderBottom - La bordure inférieure du panneau.
 */
export const Panel = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;

    background-color: ${props => props.backgroundColor ? props.backgroundColor : 'none'};

    width: ${props => props.width};
    height: ${props => props.height};

    border-right: ${props => props.borderRight ? props.borderRight : 'none'};
    border-left: ${props => props.borderLeft ? props.borderLeft : 'none'};
    border-top: ${props => props.borderTop ? props.borderTop : 'none'};
    border-bottom: ${props => props.borderBottom ? props.borderBottom : 'none'};
    border-color: ${borderColor};
`;

/**
 * Container component
 * 
 * Un composant de conteneur en row avec un space-between.
 * 
 * @param {string} width - La largeur du panneau.
 * @param {string} height - La hauteur du panneau.
 * @param {string} borderRight - La bordure droite du panneau.
 * @param {string} borderLeft - La bordure gauche du panneau.
 * @param {string} borderTop - La bordure supérieure du panneau.
 * @param {string} borderBottom - La bordure inférieure du panneau.
 */
export const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: row;

    position: relative;

    background-color: ${props => props.backgroundColor};

    width: ${props => props.width};
    height: ${props => props.height};

    border-right: ${props => props.borderRight ? props.borderRight : 'none'};
    border-left: ${props => props.borderLeft ? props.borderLeft : 'none'};
    border-top: ${props => props.borderTop ? props.borderTop : 'none'};
    border-bottom: ${props => props.borderBottom ? props.borderBottom : 'none'};
    border-color: ${borderColor};

    box-sizing: border-box;
`;

// =========================================== Func Components ===========================================

/**
 * UserIcon component
 * 
 * @param {string} border_radius - Le rayon de la bordure de l'icône. Default: '50%'.
 * @param {string} size - La taille de l'icône. Default: '1vw'.
 * @param {boolean} margin - Si true, l'icône aura un margin. Default: true.
 *
 */
export function UserIcon({ border_radius = '50%', size = '1vw', margin = true }): JSX.Element {
    return (
        <div style={{
            border: `1px solid ${borderColor}`,
            borderRadius: border_radius,
            width: 'fit-content',
            height: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: margin ? '1vw' : '0',
            marginLeft: margin ? '1vw' : '0',
            padding: '0.2vw'
        }} className="user-icon">
            <PermIdentityOutlinedIcon style={{ fontSize: size }} />
        </div>
    );
}

// =========================================== Exceptional Components ===========================================
