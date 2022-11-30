import styled from 'styled-components';

export const Background = styled.div<{$visible: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({theme}) => theme.modal.overlayBackground};
  opacity: ${({$visible}) => ($visible ? 1 : 0)};
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${({$visible}) => ($visible ? 'all' : 'none')};
`;

export const ConnectorIcon = styled.div`
  height: 76px;
  width: 76px;
  margin: 24px auto;
`;

export const BodyText = styled.p`
  font-weight: ${({theme}) => theme.typography.body.fontWeight};
  font-size: ${({theme}) => theme.typography.body.fontSize};
  line-height: ${({theme}) => theme.typography.body.lineHeight};
  color: ${({theme}) => theme.typography.colorPrimary};
  margin-bottom: 24px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  margin-top: 12px;
`;

export const GetAWalletContent = styled.div`
  align-self: center;

  h3,
  p {
    text-align: center;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 16px;
  margin-bottom: 20px;

  h2 {
    max-width: 100%;
    flex: 1;
    line-clamp: 2;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const Icon = styled.div`
  height: 24px;
  width: 20px;

  svg {
    /**
     * Not sure of the best way to handle this at the moment, but per design
     * the icon is centered with the header, so we'll use static values for
     * the time being.
     */
    margin-top: 2px;
  }
`;

export const ListItemContent = styled.div`
  margin-bottom: 24px;

  h3 {
    margin-bottom: 4px;
  }
`;

export const Sheet = styled.div`
  max-width: 380px;
  width: 100%;
  background-color: ${({theme}) => theme.modal.background};
  border: ${({theme}) => theme.modal.border};
  border-radius: ${({theme}) => theme.modal.borderRadius};
  box-shadow: ${({theme}) => theme.modal.boxShadow};
  padding: ${({theme}) => theme.modal.padding};
`;

export const SheetContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1,
  p {
    text-align: center;
  }
`;

export const Subtext = styled.span`
  color: rgba(18, 18, 18, 0.75);
  font-weight: ${({theme}) => theme.typography.body.fontWeight};
  font-size: ${({theme}) => theme.typography.body.fontSize};
  line-height: ${({theme}) => theme.typography.body.lineHeight};
`;

export const StyledLink = styled.span`
  font-weight: ${({theme}) => theme.typography.body.bold.fontWeight};
  font-size: ${({theme}) => theme.typography.body.fontSize};
  line-height: ${({theme}) => theme.typography.body.lineHeight};
  color: ${({theme}) => theme.typography.colorPrimary};
  text-decoration: underline;
  display: block;
  cursor: pointer;
`;

export const WalletListItem = styled.div`
  display: flex;
  column-gap: 16px;
  align-items: flex-start;

  p {
    margin: unset;
    text-align: left;
    font-size: 14px;
    line-height: 20px;
  }

  p + p {
    margin: default;
  }
`;
