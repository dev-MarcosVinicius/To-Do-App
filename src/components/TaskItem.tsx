import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, BackHandler } from 'react-native';
import trashIcon from '../assets/icons/trash/trash.png';
import PenEditIcon from '../assets/icons/pen-edit/pen-edit.png';
import Icon from 'react-native-vector-icons/Feather';
import { Task, TaskListEventsProps } from '../components/TasksList';

interface TasksListProps extends TaskListEventsProps {
    task: Task;
    index: number;
}

export function TaskItem({task, index, toggleTaskDone, removeTask, editTask}: TasksListProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setEditedTask(task.title);
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        editTask(task.id, editedTask);
        setIsEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
              textInputRef.current.focus();
            } else {
              textInputRef.current.blur();
            }
          }
    }, [isEditing])

    return (
        <>
            <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(task.id)}
            >
            <View 
                testID={`marker-${index}`}
                style={task.done ? styles.taskMarkerDone : styles.taskMarker}
            >
                { task.done && (
                <Icon 
                    name="check"
                    size={12}
                    color="#FFF"
                />
                )}
            </View>

            {
                isEditing 
                ?
                (
                    <TextInput
                        style={styles.input}
                        value={editedTask}
                        onChangeText={setEditedTask}
                        onSubmitEditing={handleSubmitEditing}
                        ref={textInputRef}
                    />
                )
                :
                (
                    <Text
                        style={task.done ? styles.taskTextDone : styles.taskText}                  
                    >
                        {task.title}
                    </Text>
                )
            }
            </TouchableOpacity>

            <View style={styles.iconsContainer}>
                {
                    isEditing 
                    ?
                        (
                            <View>
                                <TouchableOpacity
                                    onPress={handleCancelEditing}
                                >
                                    <Icon 
                                        name="x"
                                        size={24}
                                        color="#B2B2B2"
                                    />
                                </TouchableOpacity>
                            </View>
                        )
                    :
                        (
                            <TouchableOpacity
                                onPress={handleStartEditing}
                            >
                                <Image source={PenEditIcon} />
                            </TouchableOpacity>
                        )
                }
                <View style={styles.iconsDivider}/>
                <TouchableOpacity
                    onPress={() => removeTask(task.id)}
                    disabled={isEditing}
                >
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }}/>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
        taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium',
        paddingTop: 5,
        paddingBottom: 5
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginRight: 20
    },
    iconsDivider: {
        width: 1,
        height: 16,
        marginHorizontal: 10,
        backgroundColor: "rgba(196, 196, 196, 0.24)"
    },
    input: {
        color: '#666',
        fontFamily: 'Inter-Medium',
        width: 200,
        padding: 0
    }
})