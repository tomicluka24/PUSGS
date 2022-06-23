import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  members$: Observable<Member[]>;
  member: Member;

  constructor(private memberService: MembersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers();
  }

  verify(username: string) {
    this.memberService.getMember(username).subscribe(member => {
      this.member = member;
    });
    
    this.member.verified = "True";
    this.memberService.verifyMember(this.member).subscribe(() => {
      this.toastr.success('User verified successfully');
    })
  }

}
