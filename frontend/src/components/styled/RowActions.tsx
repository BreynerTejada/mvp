import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { actionsWrapperSx, actionButtonSx } from './RowActions.styles';

interface RowActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  editLabel?: string;
  deleteLabel?: string;
}

const RowActions: React.FC<RowActionsProps> = ({
  onEdit,
  onDelete,
  editLabel = 'Editar',
  deleteLabel = 'Eliminar',
}) => (
  <Box sx={actionsWrapperSx}>
    {onEdit && (
      <Tooltip title={editLabel}>
        <IconButton size="small" onClick={onEdit} sx={actionButtonSx} aria-label={editLabel}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}
    {onDelete && (
      <Tooltip title={deleteLabel}>
        <IconButton size="small" onClick={onDelete} sx={actionButtonSx} aria-label={deleteLabel}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}
  </Box>
);

export default RowActions;
