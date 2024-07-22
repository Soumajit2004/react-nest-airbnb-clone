"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const listing_service_1 = require("./listing.service");
const create_listing_dto_1 = require("./dto/create-listing.dto");
const user_entity_1 = require("../auth/user.entity");
const get_user_decorator_1 = require("../auth/get-user.decorator");
let ListingController = class ListingController {
    constructor(listingService) {
        this.listingService = listingService;
    }
    getListings(user) {
        return this.listingService.getListings(user);
    }
    createListing(createListingDto, user) {
        return this.listingService.createListing(createListingDto, user);
    }
};
exports.ListingController = ListingController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ListingController.prototype, "getListings", null);
__decorate([
    (0, common_1.Post)('/new'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_listing_dto_1.CreateListingDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ListingController.prototype, "createListing", null);
exports.ListingController = ListingController = __decorate([
    (0, common_1.Controller)('listing'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [listing_service_1.ListingService])
], ListingController);
//# sourceMappingURL=listing.controller.js.map