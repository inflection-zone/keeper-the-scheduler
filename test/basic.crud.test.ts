import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;
import Application from '../src/app';
const infra = Application.instance();
import { describe, it } from 'mocha';
///////////////////////////////////////////////////////////////////////////

describe('Schedule Api tests', function() {
    var agent = request.agent(infra._app);
    it('1. Create schedule using cron expression', function(done) {
        var createModel = globalThis.TestCache.ScheduleCronRegExpDetails;
        agent
            .post(`/api/v1/scheduler/cronexpr/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('ScheduleName');
                expect(response.body.Data).to.have.property('Frequency');
                expect(response.body.Data).to.have.property('Minutes');
                expect(response.body.Data).to.have.property('Hours');
                expect(response.body.Data).to.have.property('DayOfMonth');
                expect(response.body.Data).to.have.property('Month');
                expect(response.body.Data).to.have.property('DayOfWeek');
                expect(response.body.Data).to.have.property('StartDate');
                expect(response.body.Data).to.have.property('EndDate');
                expect(response.body.Data).to.have.property('HookUri');
                expect(response.body.Data).to.have.property('CronRegEx');
                expect(response.body.Data).to.have.property('CreatedAt');
                expect(response.body.Data).to.have.property('UpdatedAt');
                expect(response.body.Data).to.have.property('DeletedAt');
                
                globalThis.TestCache['id_Expression'] = response.body.Data.id;
                createModel['CreatedAt'] = response.body.Data.CreatedAt;
                createModel['UpdatedAt'] = response.body.Data.UpdatedAt;
                createModel['DeletedAt'] = response.body.Data.DeletedAt;
               
                expect(response.body.Data.id).to.equal(globalThis.TestCache['id_Expression']);
                expect(response.body.Data.ScheduleName).to.equal(createModel.ScheduleName);
                expect(response.body.Data.ScheduleType).to.equal(null);
                expect(response.body.Data.Frequency).to.equal(null);
                expect(response.body.Data.Minutes).to.equal(null);
                expect(response.body.Data.Hours).to.equal(null);
                expect(response.body.Data.DayOfMonth).to.equal(null);
                expect(response.body.Data.Month).to.equal(null);
                expect(response.body.Data.DayOfWeek).to.equal(null);
                expect(response.body.Data.StartDate).to.equal(createModel.StartDate);
                expect(response.body.Data.EndDate).to.equal(createModel.EndDate);
                expect(response.body.Data.HookUri).to.equal(createModel.HookUri);
                expect(response.body.Data.CronRegEx).to.equal(createModel.CronRegEx);
                expect(response.body.Data.CreatedAt).to.equal(createModel.CreatedAt);
                expect(response.body.Data.UpdatedAt).to.equal(createModel.UpdatedAt);
                expect(response.body.Data.DeletedAt).to.equal(createModel.DeletedAt);
            })
            .expect(201, done);
    });

    it('2. Create schedule using cron Object', function(done) {
        var createModel = globalThis.TestCache.ScheduleCronObjDetails;
        agent
            .post(`/api/v1/scheduler/cronobject/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('ScheduleName');
                expect(response.body.Data).to.have.property('Frequency');
                expect(response.body.Data).to.have.property('Minutes');
                expect(response.body.Data).to.have.property('Hours');
                expect(response.body.Data).to.have.property('DayOfMonth');
                expect(response.body.Data).to.have.property('Month');
                expect(response.body.Data).to.have.property('DayOfWeek');
                expect(response.body.Data).to.have.property('StartDate');
                expect(response.body.Data).to.have.property('EndDate');
                expect(response.body.Data).to.have.property('HookUri');
                expect(response.body.Data).to.have.property('CronRegEx');
                expect(response.body.Data).to.have.property('CreatedAt');
                expect(response.body.Data).to.have.property('UpdatedAt');
                expect(response.body.Data).to.have.property('DeletedAt');
                
                globalThis.TestCache['id_Object'] = response.body.Data.id;
                createModel['CreatedAt'] = response.body.Data.CreatedAt;
                createModel['UpdatedAt'] = response.body.Data.UpdatedAt;
                createModel['DeletedAt'] = response.body.Data.DeletedAt;
               
                expect(response.body.Data.id).to.equal(globalThis.TestCache['id_Object']);
                expect(response.body.Data.ScheduleName).to.equal(createModel.ScheduleName);
                expect(response.body.Data.ScheduleType).to.equal(createModel.ScheduleType);
                expect(response.body.Data.Frequency).to.equal(createModel.Frequency);
                expect(response.body.Data.Minutes).to.equal(createModel.Minutes);
                expect(response.body.Data.Hours).to.equal(createModel.Hours);
                expect(response.body.Data.DayOfMonth).to.equal(createModel.DayOfMonth);
                expect(response.body.Data.Month).to.equal(createModel.Month);
                expect(response.body.Data.DayOfWeek).to.equal(createModel.DayOfWeek);
                expect(response.body.Data.StartDate).to.equal(createModel.StartDate);
                expect(response.body.Data.EndDate).to.equal(createModel.EndDate);
                expect(response.body.Data.HookUri).to.equal(createModel.HookUri);
                expect(response.body.Data.CronRegEx).to.equal(null);
                expect(response.body.Data.CreatedAt).to.equal(createModel.CreatedAt);
                expect(response.body.Data.UpdatedAt).to.equal(createModel.UpdatedAt);
                expect(response.body.Data.DeletedAt).to.equal(createModel.DeletedAt);
            })
            .expect(201, done);
    });

    it('3. Get schedule by id - Cron Expression', function(done) {
        var createModel = globalThis.TestCache.ScheduleCronRegExpDetails;
        agent
            .get(`/api/v1/scheduler/${globalThis.TestCache['id_Expression']}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('ScheduleName');
                expect(response.body.Data).to.have.property('Frequency');
                expect(response.body.Data).to.have.property('Minutes');
                expect(response.body.Data).to.have.property('Hours');
                expect(response.body.Data).to.have.property('DayOfMonth');
                expect(response.body.Data).to.have.property('Month');
                expect(response.body.Data).to.have.property('DayOfWeek');
                expect(response.body.Data).to.have.property('StartDate');
                expect(response.body.Data).to.have.property('EndDate');
                expect(response.body.Data).to.have.property('HookUri');
                expect(response.body.Data).to.have.property('CronRegEx');
                expect(response.body.Data).to.have.property('CreatedAt');
                expect(response.body.Data).to.have.property('UpdatedAt');
                expect(response.body.Data).to.have.property('DeletedAt');
                
                expect(response.body.Data.id).to.equal(globalThis.TestCache['id_Expression']);
                expect(response.body.Data.ScheduleName).to.equal(createModel.ScheduleName);
                expect(response.body.Data.ScheduleType).to.equal(null);
                expect(response.body.Data.Frequency).to.equal(null);
                expect(response.body.Data.Minutes).to.equal(null);
                expect(response.body.Data.Hours).to.equal(null);
                expect(response.body.Data.DayOfMonth).to.equal(null);
                expect(response.body.Data.Month).to.equal(null);
                expect(response.body.Data.DayOfWeek).to.equal(null);
                expect(response.body.Data.StartDate).to.equal(createModel.StartDate);
                expect(response.body.Data.EndDate).to.equal(createModel.EndDate);
                expect(response.body.Data.HookUri).to.equal(createModel.HookUri);
                expect(response.body.Data.CronRegEx).to.equal(createModel.CronRegEx);
            })
            .expect(200, done);
    });

    it('4. Get schedule by id - Cron Object', function(done) {
        var createModel = globalThis.TestCache.ScheduleCronObjDetails;
        agent
            .get(`/api/v1/scheduler/${globalThis.TestCache['id_Object']}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('ScheduleName');
                expect(response.body.Data).to.have.property('Frequency');
                expect(response.body.Data).to.have.property('Minutes');
                expect(response.body.Data).to.have.property('Hours');
                expect(response.body.Data).to.have.property('DayOfMonth');
                expect(response.body.Data).to.have.property('Month');
                expect(response.body.Data).to.have.property('DayOfWeek');
                expect(response.body.Data).to.have.property('StartDate');
                expect(response.body.Data).to.have.property('EndDate');
                expect(response.body.Data).to.have.property('HookUri');
                expect(response.body.Data).to.have.property('CronRegEx');
                expect(response.body.Data).to.have.property('CreatedAt');
                expect(response.body.Data).to.have.property('UpdatedAt');
                expect(response.body.Data).to.have.property('DeletedAt');
                
                expect(response.body.Data.id).to.equal(globalThis.TestCache['id_Object']);
                expect(response.body.Data.ScheduleName).to.equal(createModel.ScheduleName);
                expect(response.body.Data.ScheduleType).to.equal(createModel.ScheduleType);
                expect(response.body.Data.Frequency).to.equal(createModel.Frequency);
                expect(response.body.Data.Minutes).to.equal(createModel.Minutes);
                expect(response.body.Data.Hours).to.equal(createModel.Hours);
                expect(response.body.Data.DayOfMonth).to.equal(createModel.DayOfMonth);
                expect(response.body.Data.Month).to.equal(createModel.Month);
                expect(response.body.Data.DayOfWeek).to.equal(createModel.DayOfWeek);
                expect(response.body.Data.StartDate).to.equal(createModel.StartDate);
                expect(response.body.Data.EndDate).to.equal(createModel.EndDate);
                expect(response.body.Data.HookUri).to.equal(createModel.HookUri);
                expect(response.body.Data.CronRegEx).to.equal(null);
            })
            .expect(200, done);
    });

    it('5. Update schedule by id - Cron Expression', function(done) {
        var createModel = globalThis.TestCache.UpdateScheduleCronRegExpDetails;
        agent
            .put(`/api/v1/scheduler/${globalThis.TestCache['id_Expression']}`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('ScheduleName');
                expect(response.body.Data).to.have.property('Frequency');
                expect(response.body.Data).to.have.property('Minutes');
                expect(response.body.Data).to.have.property('Hours');
                expect(response.body.Data).to.have.property('DayOfMonth');
                expect(response.body.Data).to.have.property('Month');
                expect(response.body.Data).to.have.property('DayOfWeek');
                expect(response.body.Data).to.have.property('StartDate');
                expect(response.body.Data).to.have.property('EndDate');
                expect(response.body.Data).to.have.property('HookUri');
                expect(response.body.Data).to.have.property('CronRegEx');
                expect(response.body.Data).to.have.property('CreatedAt');
                expect(response.body.Data).to.have.property('UpdatedAt');
                expect(response.body.Data).to.have.property('DeletedAt');
                
                createModel['CreatedAt'] = response.body.Data.CreatedAt;
                createModel['UpdatedAt'] = response.body.Data.UpdatedAt;
                createModel['DeletedAt'] = response.body.Data.DeletedAt;
               
                expect(response.body.Data.id).to.equal(globalThis.TestCache['id_Expression']);
                expect(response.body.Data.ScheduleName).to.equal(createModel.ScheduleName);
                expect(response.body.Data.ScheduleType).to.equal(null);
                expect(response.body.Data.Frequency).to.equal(null);
                expect(response.body.Data.Minutes).to.equal(null);
                expect(response.body.Data.Hours).to.equal(null);
                expect(response.body.Data.DayOfMonth).to.equal(null);
                expect(response.body.Data.Month).to.equal(null);
                expect(response.body.Data.DayOfWeek).to.equal(null);
                expect(response.body.Data.StartDate).to.equal(createModel.StartDate);
                expect(response.body.Data.EndDate).to.equal(createModel.EndDate);
                expect(response.body.Data.HookUri).to.equal(createModel.HookUri);
                expect(response.body.Data.CronRegEx).to.equal(createModel.CronRegEx);
                expect(response.body.Data.CreatedAt).to.equal(createModel.CreatedAt);
                expect(response.body.Data.UpdatedAt).to.equal(createModel.UpdatedAt);
                expect(response.body.Data.DeletedAt).to.equal(createModel.DeletedAt);
            })
            .expect(200, done);
    });

    it('6. Update schedule by id - Cron Object', function(done) {
        var createModel = globalThis.TestCache.UpdateScheduleCronObjDetails;
        agent
            .put(`/api/v1/scheduler/${globalThis.TestCache['id_Object']}`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('ScheduleName');
                expect(response.body.Data).to.have.property('Frequency');
                expect(response.body.Data).to.have.property('Minutes');
                expect(response.body.Data).to.have.property('Hours');
                expect(response.body.Data).to.have.property('DayOfMonth');
                expect(response.body.Data).to.have.property('Month');
                expect(response.body.Data).to.have.property('DayOfWeek');
                expect(response.body.Data).to.have.property('StartDate');
                expect(response.body.Data).to.have.property('EndDate');
                expect(response.body.Data).to.have.property('HookUri');
                expect(response.body.Data).to.have.property('CronRegEx');
                expect(response.body.Data).to.have.property('CreatedAt');
                expect(response.body.Data).to.have.property('UpdatedAt');
                expect(response.body.Data).to.have.property('DeletedAt');
                
                createModel['CreatedAt'] = response.body.Data.CreatedAt;
                createModel['UpdatedAt'] = response.body.Data.UpdatedAt;
                createModel['DeletedAt'] = response.body.Data.DeletedAt;
               
                expect(response.body.Data.id).to.equal(globalThis.TestCache['id_Object']);
                expect(response.body.Data.ScheduleName).to.equal(createModel.ScheduleName);
                expect(response.body.Data.ScheduleType).to.equal(createModel.ScheduleType);
                expect(response.body.Data.Frequency).to.equal(createModel.Frequency);
                expect(response.body.Data.Minutes).to.equal(createModel.Minutes);
                expect(response.body.Data.Hours).to.equal(createModel.Hours);
                expect(response.body.Data.DayOfMonth).to.equal(createModel.DayOfMonth);
                expect(response.body.Data.Month).to.equal(createModel.Month);
                expect(response.body.Data.DayOfWeek).to.equal(createModel.DayOfWeek);
                expect(response.body.Data.StartDate).to.equal(createModel.StartDate);
                expect(response.body.Data.EndDate).to.equal(createModel.EndDate);
                expect(response.body.Data.HookUri).to.equal(createModel.HookUri);
                expect(response.body.Data.CronRegEx).to.equal(null);
                expect(response.body.Data.CreatedAt).to.equal(createModel.CreatedAt);
                expect(response.body.Data.UpdatedAt).to.equal(createModel.UpdatedAt);
                expect(response.body.Data.DeletedAt).to.equal(createModel.DeletedAt);
            })
            .expect(200, done);
    });

    it('7. Delete schedule by id', function(done) {
        var createModel = globalThis.TestCache.UpdateScheduleCronObjDetails;
        agent
            .del(`/api/v1/scheduler/${globalThis.TestCache['id_Object']}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.Deleted).to.have.property('id');
                expect(response.body.Data.Deleted).to.have.property('ScheduleName');
                expect(response.body.Data.Deleted).to.have.property('Frequency');
                expect(response.body.Data.Deleted).to.have.property('Minutes');
                expect(response.body.Data.Deleted).to.have.property('Hours');
                expect(response.body.Data.Deleted).to.have.property('DayOfMonth');
                expect(response.body.Data.Deleted).to.have.property('Month');
                expect(response.body.Data.Deleted).to.have.property('DayOfWeek');
                expect(response.body.Data.Deleted).to.have.property('StartDate');
                expect(response.body.Data.Deleted).to.have.property('EndDate');
                expect(response.body.Data.Deleted).to.have.property('HookUri');
                expect(response.body.Data.Deleted).to.have.property('CronRegEx');
                expect(response.body.Data.Deleted).to.have.property('CreatedAt');
                expect(response.body.Data.Deleted).to.have.property('UpdatedAt');
                expect(response.body.Data.Deleted).to.have.property('DeletedAt');
                               
                expect(response.body.Data.Deleted.id).to.equal(globalThis.TestCache['id_Object']);
                expect(response.body.Data.Deleted.ScheduleName).to.equal(createModel.ScheduleName);
                expect(response.body.Data.Deleted.ScheduleType).to.equal(createModel.ScheduleType);
                expect(response.body.Data.Deleted.Frequency).to.equal(createModel.Frequency);
                expect(response.body.Data.Deleted.Minutes).to.equal(createModel.Minutes);
                expect(response.body.Data.Deleted.Hours).to.equal(createModel.Hours);
                expect(response.body.Data.Deleted.DayOfMonth).to.equal(createModel.DayOfMonth);
                expect(response.body.Data.Deleted.Month).to.equal(createModel.Month);
                expect(response.body.Data.Deleted.DayOfWeek).to.equal(createModel.DayOfWeek);
                expect(response.body.Data.Deleted.StartDate).to.equal(createModel.StartDate);
                expect(response.body.Data.Deleted.EndDate).to.equal(createModel.EndDate);
                expect(response.body.Data.Deleted.HookUri).to.equal(createModel.HookUri);
                expect(response.body.Data.Deleted.CronRegEx).to.equal(null);
            })
            .expect(200, done);
    });
});

