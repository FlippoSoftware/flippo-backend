import { type Meta } from '@storybook/react';

import * as Icons from '../index';
import st from './Decorator.module.scss';

const meta: Meta = {
  title: 'UIKit/Icons'
};

export default meta;

export const AllIcons = {
  render: () => (
    <div className={st.grid}>
      <Icons.EnIcon />
      <Icons.RuIcon />
      <Icons.GoogleIcon />
      <Icons.VKIcon />
      <Icons.YandexIcon />
      <Icons.EmailIcon type={'aol'} />
      <Icons.EmailIcon type={'gmail'} />
      <Icons.EmailIcon type={'iCloud'} />
      <Icons.EmailIcon type={'mailru'} />
      <Icons.EmailIcon type={'outlook'} />
      <Icons.EmailIcon type={'protonMail'} />
      <Icons.EmailIcon type={'yahoo'} />
      <Icons.EmailIcon type={'yandex'} />
      <Icons.AddIcon type={'default'} />
      <Icons.AddIcon type={'note'} />
      <Icons.ArrowIcon type={'default'} />
      <Icons.ArrowIcon type={'link'} />
      <Icons.AttachIcon />
      <Icons.BookMarkIcon type={'default'} />
      <Icons.BookMarkIcon type={'active'} />
      <Icons.BookMarkIcon type={'stack'} />
      <Icons.CaptiveIcon type={'default'} />
      <Icons.CaptiveIcon type={'public'} />
      <Icons.ChevronIcon type={'bottom'} />
      <Icons.ChevronIcon type={'left'} />
      <Icons.ChevronIcon type={'right'} />
      <Icons.ChevronIcon type={'top'} />
      <Icons.ClockLoaderIcon type={'load40'} />
      <Icons.ClockLoaderIcon type={'load60'} />
      <Icons.CloseIcon />
      <Icons.DatasetIcon />
      <Icons.DeleteIcon />
      <Icons.DragIcon />
      <Icons.EditIcon />
      <Icons.ErrorIcon type={'circle'} />
      <Icons.ErrorIcon type={'circleFilled'} />
      <Icons.FavoriteIcon type={'default'} />
      <Icons.FavoriteIcon type={'filled'} />
      <Icons.FolderIcon type={'default'} />
      <Icons.FolderIcon type={'stack'} />
      <Icons.FolderIcon type={'add'} />
      <Icons.HomeIcon />
      <Icons.LinkIcon type={'default'} />
      <Icons.LinkIcon type={'add'} />
      <Icons.LinkIcon type={'off'} />
      <Icons.ListIcon type={'order'} />
      <Icons.ListIcon type={'unorder'} />
      <Icons.LogoutIcon />
      <Icons.MoreIcon type={'horizontal'} />
      <Icons.MoreIcon type={'vertical'} />
      <Icons.NotificationIcon />
      <Icons.PersonIcon type={'check'} />
      <Icons.PersonIcon type={'checkFilled'} />
      <Icons.PersonIcon type={'edit'} />
      <Icons.PersonIcon type={'editFilled'} />
      <Icons.PersonIcon type={'pin'} />
      <Icons.PersonIcon type={'add'} />
      <Icons.GroupIcon />
      <Icons.SchoolIcon />
      <Icons.SearchIcon />
      <Icons.SetIcon type={'default'} />
      <Icons.SetIcon type={'add'} />
      <Icons.SuccessIcon type={'default'} />
      <Icons.SuccessIcon type={'circle'} />
      <Icons.SuccessIcon type={'circleFilled'} />
      <Icons.SettingsIcon />
      <Icons.ShuffleIcon />
      <Icons.SwapIcon type={'horizontal'} />
      <Icons.SwapIcon type={'vertical'} />
      <Icons.CodeBlockIcon />
      <Icons.ItalicIcon />
      <Icons.BoldIcon />
      <Icons.UnderlineIcon />
      <Icons.UndoIcon />
      <Icons.RedoIcon />
      <Icons.WarningIcon type={'circle'} />
      <Icons.WarningIcon type={'circleFilled'} />
      <Icons.ShareIcon />
      <Icons.CopyIcon />
      <Icons.TagIcon />
      <Icons.SortByAlphaIcon />
      <Icons.PreviewIcon />
      <Icons.PlaceItemIcon />
      <Icons.HistoryIcon />
      <Icons.ExploreIcon />
      <Icons.DriveFileMoveIcon />
    </div>
  )
};
