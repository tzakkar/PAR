'use client'

import React from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { Button } from './button'
import { Input } from './input'
import { Trash2 } from 'lucide-react'

interface SortableItemProps {
  id: string
  value: string
  placeholder: string
  onUpdate: (value: string) => void
  onRemove: () => void
}

function SortableItem({ id, value, placeholder, onUpdate, onRemove }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center space-x-2 p-2 border rounded-lg bg-background"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input
        value={value}
        onChange={(e) => onUpdate(e.target.value)}
        placeholder={placeholder}
        className="flex-1"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={onRemove}
        className="text-destructive hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

interface SortableListProps {
  items: string[]
  onItemsChange: (items: string[]) => void
  placeholder: string
  addButtonText: string
  onAdd: () => void
}

export function SortableList({
  items,
  onItemsChange,
  placeholder,
  addButtonText,
  onAdd,
}: SortableListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((_, index) => `item-${index}` === active.id)
      const newIndex = items.findIndex((_, index) => `item-${index}` === over?.id)

      const newItems = arrayMove(items, oldIndex, newIndex)
      onItemsChange(newItems)
    }
  }

  const handleUpdate = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    onItemsChange(newItems)
  }

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    onItemsChange(newItems)
  }

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map((_, index) => `item-${index}`)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map((item, index) => (
              <SortableItem
                key={`item-${index}`}
                id={`item-${index}`}
                value={item}
                placeholder={placeholder}
                onUpdate={(value) => handleUpdate(index, value)}
                onRemove={() => handleRemove(index)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      
      <Button
        variant="outline"
        onClick={onAdd}
        className="w-full"
      >
        <span className="mr-2">+</span>
        {addButtonText}
      </Button>
    </div>
  )
}

