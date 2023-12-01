import { AfterContentChecked, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tag } from '../../interfaces/tag.model';
import { FormUtilsService } from 'app/shared/utils/form-utils.service';
import { TagPayload } from '../../interfaces/tag-payload';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['../tag-item/tag-item.component.scss', './tag-form.component.scss']
})
export class TagFormComponent implements AfterContentChecked, OnInit {
  constructor(private formUtils: FormUtilsService) {}

  @ViewChild('tagInput') tagInput: ElementRef | undefined;
  @Input() tag: Tag | undefined;
  @Output() isActive = new EventEmitter<boolean>();
  @Output() tagData = new EventEmitter<TagPayload>();

  public tagForm = new FormGroup(
    {
      name: new FormControl('', {
        validators: [Validators.required, this.formUtils.noWhitespaceValidator],
        nonNullable: true
      }),
      color: new FormControl('#000000', { validators: [Validators.required], nonNullable: true }),
    }
  )

  public get name() {
    return this.tagForm.get('name');
  }

  public onSubmit() {
    if((this.tag?.name !== this.tagForm.value.name || this.tag?.color !== this.tagForm.value.color) && this.tagForm.valid) {
      this.tagData.emit(this.tagForm.getRawValue());
    };
    this.onCancel();
  }

  public onCancel() {
    this.isActive.emit(false);
    return this.tagForm.reset();
  }

  ngOnInit(): void {
    if (this.tag) {
      this.tagForm.patchValue(this.tag);
    }
  }

  ngAfterContentChecked(): void {
    this.tagInput?.nativeElement.focus();
  }
}
