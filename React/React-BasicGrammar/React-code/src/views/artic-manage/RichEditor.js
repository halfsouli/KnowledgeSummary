import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
export default class RichEditor extends Component {
    state={
        editorState:'',//同步编辑器状态
        contentState:''//同步内容
    }
    componentDidMount() {
        if (!this.props.content){
            return;
        }
        const html =this.props.content
        const contentBlock = htmlToDraft(html)
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({
                editorState
            });
        }
    }
    
    render() {
        return (
            <div>
                <Editor
                    editorState={this.state.editorState}
                    toolbarClassName="toolbarClassName"//DIY样式
                    wrapperClassName="wrapperClassName"//DIY样式
                    editorClassName="editorClassName"//DIY样式
                    onEditorStateChange={this.onEditorStateChange}
                    onContentStateChange={this.onContentStateChange}
                    onBlur={()=>{
                        // 失去焦点的时候，再传给父组件
                        this.props.getContent(this.state.contentState)
                    }}
                />
            </div>
        )
    }
    onContentStateChange=(contentState)=>{
        // console.log(draftToHtml(contentState))
        this.setState({
            contentState: draftToHtml(contentState)
        })
    }
    onEditorStateChange = (editorState)=>{  
    this.setState({
        editorState
    })
        console.log(editorState)
    }
}